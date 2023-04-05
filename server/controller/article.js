const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createArticles = async (req, res) => {
  const data = req.body;
  const article = await prisma.article.create({
    data: data,
  });
  console.log("Article created");
  res.send(article);
};

const getArticles = async (req, res) => {
  let articles = await prisma.article.findMany();
  console.log("Article received");
  res.send(articles);
};

const updateArticles = async (req, res) => {
  let article = await prisma.article.update({
    where: {
      title: req.body.title,
    },
    data: { markdown: req.body.markdown },
  });
  console.log("Article Updated");
  res.send(article);
};

const deleteArticle = async (req, res) => {
  let article = await prisma.article.delete({
    where: {
      title: req.body.title,
    },
  });
  console.log("Article deleted");
  res.send(article);
};
module.exports = { createArticles, getArticles, updateArticles, deleteArticle };
