// Init
const router = require("express").Router();
const AdminController = require("../controller/admin");
const auth = require("../middleware/auth");
const STRINGS = require("../utils/text");

// validators
const {
  registerPartnerValidator,
  loginPartnerValidator,
  updateUserValidator,
  forgotPasswordPartnerValidator,
  resetPasswordPartnerValidator,
  verifyOtpPartnerValidator,
  changePasswordValidator,
  partnerRequestValidator,
  userRequestValidator,
  partnerOfferRequestValidator,
  isValidated,
  createSubscriptionValidator,
} = require("../middleware/validator");

// Routes ******************************

// *************** Offers *******************
// **************************************

//get all offers
// router.get(
//   "/offers/:status",
//   //auth(STRINGS.ROLES.ADMIN),
//   AdminController.getAllOffersByStatus
// );

// *************** End *******************
// **************************************

// *************** Members *******************
// **************************************

//get all users
//router.get("/users", auth(STRINGS.ROLES.ADMIN), AdminController.getAllUsers);

// *************** End *******************
// **************************************

// *************** end *******************
// **************************************

// *************** End *******************
// **************************************

// *************** Auth *******************
// **************************************

//register admin
router.post("/signup", isValidated, AdminController.adminSignup);
//login admin
router.post("/login", isValidated, AdminController.adminLogin);

router.post(
  "/forgot-pass",
  //auth(STRINGS.ROLES.ADMIN),
  AdminController.forgotPassword
);

// //update admin
// router.patch(
//   "/update",
//   auth(STRINGS.ROLES.ADMIN),
//   upload("/", "profile_photo", "single"),
//   updateUserValidator,
//   isValidated,
//   AdminController.updateUser
// );
// //forgot password
// router.post("/forgot-password", isValidated, AdminController.forgotPassword);

// //change password
// router.post(
//   "/change-password",
//   auth(STRINGS.ROLES.ADMIN),
//   changePasswordValidator,
//   isValidated,
//   AdminController.changePassword
// );

//Create Call
router.post("/create", auth(STRINGS.ROLES.ADMIN), AdminController.create);

router.post("/start", auth(STRINGS.ROLES.ADMIN), AdminController.startCall);

router.post(
  "/create-room",
  auth(STRINGS.ROLES.ADMIN),
  AdminController.createRoom
);

router.post("/join-room", auth(STRINGS.ROLES.ADMIN), AdminController.joinRoom);

router.get("/room", auth(STRINGS.ROLES.ADMIN), AdminController.getRoom);

router.post(
  "/exit-call",
  auth(STRINGS.ROLES.ADMIN),
  AdminController.VideoCallLogout
);
//TWILIO VIDEO CALL
router.post("/twilio-composition", AdminController.createComposition);

router.post("/twilio", AdminController.TwilioVideoCall);

router.post("/twilio-con", AdminController.CreateConversation);

router.post(
  "/twilio-conRet",
  auth(STRINGS.ROLES.ADMIN),
  AdminController.getConversation
);

// *************** End *******************
// **************************************

// Export
module.exports = router;
