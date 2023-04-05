const prisma = require("../prisma/index");
const express = require("express");
const jwt = require("jsonwebtoken");
const { sign, verify } = require("jsonwebtoken");

// const getToken = async (req, res) => {
//   const username = req.body.username;
//   const user = { name: username };

//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
//   console.log(accessToken);
//   res.json({ accessToken: accessToken });
// };
class PostController {
  async getPosts(req, res) {
    try {
      const result = await prisma.post.findMany();
      console.log("Posts are :", result);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send("Not found");
    }
  }

  async createPost(req, res) {
    try {
      const body = req.body;
      const data = {
        title: body.title,
        body: body.body,
      };
      const result = await prisma.post.create({
        data: data,
      });
      console.log("Posts created is :", result);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send("Not created");
    }
  }
}
module.exports = new PostController();
