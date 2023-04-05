const router = require("express").Router();

const AuthController = require("../controller/admin");
//const { authenticateToken } = require("../middleware/auth");

//router.get("/TOKEN", getToken);

router.post("/signup", AuthController.Signup);

//router.post("/login", AuthController.createPost);

module.exports = router;
