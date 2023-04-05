const express = require("express");
const { ValidWallet, getWallets } = require("../controller/wallet");
const { authenticateToken } = require("../middleware/authenti");
const router = express.Router();

//router.post("/", createWallet);

router.post("/valid", authenticateToken, ValidWallet);

router.get("/", getWallets);

module.exports = router;
