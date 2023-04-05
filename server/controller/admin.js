const prisma = require("../prisma/index");
const { Roles } = require("@prisma/client");
const crypto = require("crypto");

const bcrypt = require("bcryptjs");
const STRINGS = require("../utils/text");
const MailService = require("../services/mail.service");
const AuthService = require("../services/auth.service");
const UserService = require("../services/user.service");
const LoggerService = require("../config/logger");
const VideoCallService = require("../services/video-call.service");
//const AdminVideoCallService = require("../services/video-call.service");
const dayjs = require("dayjs");

class AdminController {
  async adminSignup(req, res) {
    try {
      let data = req.body;

      //   check if email exists
      let emailExists = await UserService.userEmailExists(data.email);

      // send message to user email exists
      if (emailExists) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.userAlreadyExists,
          res
        );
      }

      // generating hashed password
      const hashedPassword = AuthService.HashPassword(data.password);

      const body = {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        status: STRINGS.STATUS.APPROVED,
        role: Roles.admin,
      };

      let user = await UserService.createUser(body);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.userCreated,
        res,
        { user }
      );
    } catch (error) {
      console.log("Admin SignUp Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  async adminLogin(req, res) {
    try {
      let data = req.body;

      // check if email exists
      let user = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });
      console.log("User-->", user);
      // send message to user email exists
      if (!user) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.userNotExists,
          res
        );
      }

      console.log("Pass1", user.password);
      console.log("Pass2", data.password);

      //Check Password
      const isCorrect = AuthService.comparePassword(
        data.password,
        user.password
      );

      if (!isCorrect) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.passwordInvalid,
          res
        );
      }

      // generating auth token
      const token = AuthService.generateToken(user);

      delete user.password;

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.userLogin,
        res,
        { token }
      );
    } catch (error) {
      console.log("User Login Error-->", error);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  // forgot password
  async forgotPassword(req, res) {
    try {
      let data = req.body;

      //   check if email exists
      let emailExists = await UserService.userEmailExists(data.email);

      // send message to user email exists
      if (!emailExists) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.userNotExists,
          res
        );
      }

      // generate otp
      let otp = AuthService.generateOTP();

      // update user
      const body = {
        otp: String(otp),
        status: STRINGS.STATUS.ACTIVE,
      };

      let _id = emailExists.id;
      const user = await UserService.updateUser(_id, body);

      //Sending Email to user
      await MailService.sendForgotPasswordEmail(user, otp);

      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.passwordResetEmailSent,
        res
      );
    } catch (error) {
      console.log("Forgot Password User Error-->", error);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  async create(req, res) {
    try {
      const body = req.body;
      const adminId = req.user.id;

      const token = crypto.randomBytes(16).toString("hex");
      let data = {
        date: body.date,
        roomId: token,
        adminId: adminId,
      };
      let call = await prisma.videoCall.create({
        data,
      });
      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.callCreated,
        res,
        call
      );
    } catch (error) {
      console.log("ERROR", error);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  async createRoom(req, res) {
    try {
      let roomName = req.body.roomName;

      let room = await VideoCallService.createRoom(roomName);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.roomCreated,
        res.send(room)
        // { Response: room }
      );
    } catch (error) {
      console.log("Error-->", error);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  async getRoom(req, res) {
    try {
      const room = await prisma.videoCall.findFirst({
        where: {
          title: null,
        },
      });
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.roomDetails,
        res,
        { Response: room }
      );
    } catch (error) {
      console.log("Error-->", error);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  async joinRoom(req, res) {
    try {
      let roomId = req.body.roomId;

      let room = await prisma.videoCall.findFirst({
        where: {
          AND: [
            {
              roomId: roomId,
            },
          ],
        },
      });
      console.log("roomId", room);
      if (!room) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.TEXTS.roomNotFound,
          res
        );
      }

      let getRoom = await VideoCallService.getRoom(roomId);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.roomDetails,
        res,
        { Response: getRoom }
      );
    } catch (error) {
      console.log("Error-->", error);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  async startCall(req, res) {
    try {
      const _id = req.body.roomId;
      const userId = req.user.id;
      let call = await prisma.videoCall.findFirst({
        where: {
          AND: [
            {
              roomId: _id,
            },
            {
              callType: "call",
            },
          ],
        },
      });
      console.log("CallId", call);
      if (!call) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.TEXTS.invalidCallId,
          res
        );
      }

      let token = await VideoCallService.startCall(call?.roomId, userId);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.callDetails,
        res,
        { token: token }
      );
    } catch (error) {
      console.log("Error-->", error);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  async createComposition(req, res) {
    try {
      let roomSid = req.body.roomSid;
      const result = VideoCallService.createComposition(roomSid);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.twilioVideoCallStatus,
        res,
        { status: result }
      );
    } catch (error) {
      console.log(error.message, "error video");
    }
  }

  async VideoCallLogout(req, res) {
    try {
      let roomId = req.body.roomId;

      let token = await VideoCallService.exitRoom(roomId);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.callUpdated,
        res,
        { data: token }
      );
    } catch (error) {
      console.log("Error-->", error);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  async TwilioVideoCall(req, res) {
    try {
      const data = req.body.StatusCallbackEvent;
      let result = VideoCallService.twilioVideoCallAction(data);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.twilioVideoCallStatus,
        console.log("hello admin--->", result),

        res,
        result
      );
    } catch (error) {
      console.log(error.message, "error video");
    }
  }

  //CREATE: Attach a new Conversation Scoped Webhook
  async CreateConversation(req, res) {
    try {
      let cid = req.body.cid;
      let result = VideoCallService.conversation(cid);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.twilioVideoCallStatus,
        console.log("hello admin--->", result),

        res,
        result
      );
    } catch (error) {
      console.log(error.message, "error video");
    }
  }

  // FETCH: Retrieve a Conversation Scoped Webhook
  async getConversation(req, res) {
    try {
      let cid = req.body.cid;
      let wid = req.body.wid;
      let result = VideoCallService.conversation(cid, wid);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.twilioVideoCallStatus,
        console.log("hello admin--->", result),

        res,
        result
      );
    } catch (error) {
      console.log(error.message, "error video");
    }
  }
}

module.exports = new AdminController();
