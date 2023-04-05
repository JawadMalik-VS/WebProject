const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProducts = async (req, res) => {
  const data = req.body;
  const prod = await prisma.product.create({
    data: data,
  });
  console.log("product created");
  res.send(prod);
};

const getProducts = async (req, res) => {
  const result = await prisma.product.findMany();
  res.send(result);
  console.log("All products here");
};

const getProductsById = async (req, res) => {
  const result = await prisma.product.findUnique({
    where: { ...req.query },
  });
  res.send(result);
  console.log("Product hunted");
};

const updateProducts = async (req, res) => {
  const result = await prisma.product.update({
    where: { pid: req.body.pid },
    data: { name: req.body.name },
  });
  res.send(result);
  console.log("Updated");
};

const deleteProducts = async (req, res) => {
  const result = await prisma.product.delete({
    where: { pid: req.body.pid },
  });
  res.send(result);
  console.log("Deleted");
};

module.exports = {
  createProducts,
  getProducts,
  getProductsById,

  updateProducts,
  deleteProducts,
};
