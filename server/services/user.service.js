const prisma = require("../prisma/index");
const ENV = process.env;

class UserService {
  constructor() {
    this.selectUserFields = {
      id: true,
      email: true,
      name: true,
      role: true,
      otp: true,
    };
  }

  // create  user
  createUser(data) {
    return prisma.user.create({
      data: data,
    });
  }

  //Check Email ExistsfindFirst
  userEmailExists(email) {
    return prisma.user.findFirst({
      where: {
        AND: [
          {
            email: email,
          },
        ],
      },
    });
  }

  //get single user
  getUser(email) {
    return prisma.user.findFirst({
      where: {
        email: email,
        role: {
          has: "admin",
        },
      },
      select: this.selectUserFields,
    });
  }

  //update user
  updateUser(id, data) {
    return prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  //Check otp validity
  checkOtpValid(otp) {
    return prisma.user.findFirst({
      where: {
        otp: otp,
      },
    });
  }

  //Update OTP Status
  updatOtpStatus(otp, status) {
    return prisma.user.update({
      where: {
        otp: otp,
      },
      data: {
        status: status,
      },
    });
  }

  //get user by id
  getSingleUser(userId) {
    return prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  // create notification
  createNotification(title, description, userId) {
    try {
      const notification = prisma.notifications.create({
        data: {
          title: title,
          body: description,
          user_id: userId,
        },
      });
      return notification;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create notification");
    }
  }
}

module.exports = new UserService();
