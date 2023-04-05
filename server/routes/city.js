const express = require("express");
const CityController = require("../controller/city");
const router = express.Router();

router.post("/create", CityController.createCity);
router.get("/", CityController.getCity);

module.exports = router;
