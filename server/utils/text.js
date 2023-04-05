module.exports = {
  ERRORS: {
    partnerAlreadyExists: "Partner exists with this email!",
    partnerNotExists: "Partner does not exists ",
    passwordInvalid: "Invalid password!",
    oldPasswordInvalid: "Invalid old password!",
    accountExists: "Account exists with this email!",
    partnerAccountExists: "Partner account exists with this email!",
    userAccountExists: "Member account exists with this email!",

    NoMemberSubscriptionsExists: "Member does not have any subscription !",

    tokenInvalid: "Unauthorized access: Token not found",
    userNotFound: "Unauthorized access: User does not exist",
    unAuthorized: "Unauthorized access",
    emailInvalid: "Invalid Email",
    optInvalid: "Invalid OTP",
    otpExpires: "Otp Expires",
    notVerified: "You are not verified by admin ",
    tokenExpired: "Token expired!",

    // offer ******

    offerExists: "You already have offer with this title",
    offerAlreadyRedeemed: "You have already redeem this offer ",
    reviewAlready: "You have already added review to this offer ",

    // subscriptions ******
    subscriptionsExists: "You already have subscriptions with this title",
    subscriptionsNotExists: "Subscriptions does not exists ",
    // member subscriptions ******
    member_subscriptionsExists: "You already have subscriptions",
    member_subscriptionsNotExists:
      "You don't  have subscriptions with this subscriptions id",

    offerNotFound: "Offer not found",
    imageNotFound: "No image found with this id",
    // user *****
    userAlreadyExists: "User exists with this email!",
    userNotExists: "User does not exists with this user id!",
    // referral *****
    referralExists:
      "You  already  sent an offer to this partner with this offer",
  },
  TEXTS: {
    // partner *******
    partnerCreated: "Partner created successfully",
    partnerLogin: "Partner login successfully",
    partnerUpdated: "Partner updated successfully",
    forgotPasswordEmailSubject: "Forgot Password",
    passwordResetEmailSent: "Reset password email sent",

    passwordUpdated: "Password updated successfully",
    otpVerified: "Otp verified successfully",

    // offer **********
    offerCreated: "Offer created successfully",
    offerUpdated: "Offer updated successfully",
    offerRedeemed: "Offer Redeemed successfully",
    reviewAdded: "Review added successfully",

    invalidCallId: "Invalid call id",

    imageDeleted: "Image deleted successfully",
    // user
    userCreated: "User created successfully",
    userLogin: "User login successfully",
    userUpdated: "User updated successfully",
    // Referral ***
    referralSent: "Referral Sent Successfully",

    //Calls
    callCreated: "Call Created",
    callDetails: "Call Details",
    callNotFound: "Call doesn't exist",
    callUpdated: "Call Updated",
    callDeleted: "Call Deleted",
    callExists: "CallLibrary already Exist",

    //rooms
    roomCreated: "Room Created",
    roomDetails: "Room Details",
    roomNotFound: "Room doesn't exist",
    roomUpdated: "Room Updated",
    roomDeleted: "Room Deleted",
    roomExists: "Room already Exist",

    // subscriptions
    subscriptionsCreated: "Subscriptions created successfully",
    subscriptionsUpdated: " Subscriptions updated successfully",
    subscriptionsDeleted: " Subscriptions deleted successfully",
    //member subscriptions
    member_subscriptionsCreated: "Membership Subscribed  successfully",
    member_subscriptionsDeleted: " Membership Un Subscribed  successfully",

    // room messages
    meetingEnded: "Meeting has ended!",
    twilioVideoCallStatus: "Video Call Recording ",
  },

  ROLES: {
    MEMBER: "member",
    ADMIN: "admin",
    PARTNER: "partner",
  },
  STATUS: {
    ACTIVE: "active",
    PENDING: "pending",
    REJECTED: "rejected",
    INACTIVE: "inactive",
    UNAPPROVED: "unapproved",
    APPROVED: "approved",
  },
  STATUS_CODE: {
    NOT_FOUND: 404,
    EXISTS: 400,
    INTERNAL_SERVER_ERROR: 500,
    SUCCESS: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
  },
};
