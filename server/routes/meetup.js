const express = require("express");
const {
  createMeetup,
  getMeetup,
  deleteMeetup,
  updateMeetup,
} = require("../controller/meetup");
const router = express.Router();

router.post("/create", createMeetup);
router.get("/", getMeetup);
router.put("/update/:id", updateMeetup);
router.delete("/delete/:id", deleteMeetup);

module.exports = router;
