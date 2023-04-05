const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
} = require("../controller/product");

router.get("/", getProducts);

router.get("/id", getProductsById);

router.post("/create", createProducts);

router.put("/id", updateProducts);

router.delete("/id", deleteProducts);

module.exports = router;
