// Init
const router = require("express").Router();
const UserController = require("../controllers/user");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer.js");
const STRINGS = require("../utils/texts");

// validators
const {
  registerPartnerValidator,
  loginPartnerValidator,
  updateUserValidator,
  forgotPasswordPartnerValidator,
  resetPasswordPartnerValidator,
  verifyOtpPartnerValidator,
  changePasswordValidator,
  isValidated,
} = require("../middleware/validators");

// Routes ******************************

//register user
router.post(
  "/signup",
  registerPartnerValidator,
  isValidated,
  UserController.signup
);
//login user
router.post("/login", loginPartnerValidator, isValidated, UserController.login);
//update user
router.patch(
  "/update",
  auth(STRINGS.ROLES.MEMBER),
  upload("/", "profile_photo", "single"),
  updateUserValidator,
  isValidated,
  UserController.updateUser
);
//forgot password
router.post(
  "/forgot-password",
  forgotPasswordPartnerValidator,
  isValidated,
  UserController.forgotPassword
);
//otp verify password
router.post(
  "/verify-otp",
  verifyOtpPartnerValidator,
  isValidated,
  UserController.verifyOtp
);
//reset password
router.post(
  "/reset-password",
  resetPasswordPartnerValidator,
  isValidated,
  UserController.resetPassword
);
//change password
router.post(
  "/change-password",
  auth(STRINGS.ROLES.MEMBER),
  changePasswordValidator,
  isValidated,
  UserController.changePassword
);

// get one user
router.get("/", auth(STRINGS.ROLES.MEMBER), UserController.getUser);

//get all offers memberships of member
router.get(
  "/benefits",
  auth(STRINGS.ROLES.MEMBER),
  UserController.getAllBenefits
);
//get all previous benefits
router.get(
  "/previous",
  auth(STRINGS.ROLES.MEMBER),
  UserController.getAllPreviousBenefits
);

//get referrals
router.get(
  "/referral",
  auth(STRINGS.ROLES.MEMBER),
  UserController.getReferrals
);

router.get(
  "/reviews",
  auth(STRINGS.ROLES.MEMBER),
  UserController.getReviewsByMember
);
// get one user
router.get("/:id", UserController.getQrCode);

// Social Login
// **************

router.post("/google", UserController.GoogleLogin);
router.post("/facebook", UserController.FacebookLogin);
router.post("/apple", UserController.AppleLogin);
// Export
module.exports = router;
