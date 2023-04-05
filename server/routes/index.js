const router = require("express").Router();
const HelperController = require("../utils/helpers");
const upload = require("../middleware/multer.js");

//All Routes
router.use("/v1/city", require("./city"));
router.use("/v1/admin", require("./admin"));
//router.use("/v1/user", require("./user"));

router.use("/v1/product", require("./product"));
//router.use("v1/items", require("./items"));
// router.use("v1/article", require("./article"));
// router.use("v1/student", require("./student"));
// router.use("v1/teacher", require("./teacher"));
router.use("/v1/wallet", require("./wallet"));
router.use("/v1/meetup", require("./meetup"));
router.use("/v1/post", require("./post"));

const ENV = process.env;

// // refresh token api
// router.post("/v1/refresh-token", async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!token) {
//       return res.sendStatus(401);
//     }
//     const access_token = await HelperController.generateRefreshToken(
//       token,
//       res
//     );
//     res.json({ access_token });
//   } catch (error) {
//     console.log("Refresh token error--->", error.message);
//     res.json({ message: "Something went wrong" });
//   }
// });

// router.post(
//   "/v1/upload-one",
//   upload("/", "image", "single"),
//   async (req, res) => {
//     try {
//       let uploadedPicture;
//       if (req.file) {
//         uploadedPicture = ENV.BASE_URL + req.file.path;
//       } else {
//         return res.status(400).json({
//           message: "File not uploaded successfully",
//           uri: uploadedPicture.trim(),
//         });
//       }
//       console.log(uploadedPicture.trim(), "req.file");
//       let temp_image = uploadedPicture.trim();
//       return res.send(temp_image);
//     } catch (error) {
//       console.log("Error--->", error);
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// Export
module.exports = router;
