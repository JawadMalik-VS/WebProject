const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../data/data.json");

router
  .get(async(req, res) => {
    res.json(data.employees);
  })
  router.post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  router.put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })

  router.delete((req, res) => {
    res.json({ id: req.body.id });
  });

router.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
