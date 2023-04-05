const express = require("express");
const {
  createArticles,
  getArticles,
  updateArticles,
  deleteArticle,
} = require("../controller/article");

const router = express.Router();

router.post("/", createArticles);

router.get("/", getArticles);

router.put("/", updateArticles);

router.delete("/", deleteArticle);

module.exports = router;
