const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createStudent = async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    const result = await prisma.student.create({
      data: data,
    });
    res.status(200).send("It worked");
    console.log("Student Created");
  } catch (err) {
    res.status(500).send("Not working");
    console.log("issue in Student creation");
  }
};

const getStudent = async (req, res) => {
  try {
    const result = await prisma.student.findMany();
    console.log("student received");
    res.status(200).send(result);
  } catch {
    console.log("Issue in getting students");
  }
};

const updateStudents = async (req, res) => {
  try {
    const result = await prisma.student.update({
      where: { email: req.body.email },
      data: { password: req.body.password },
    });
    res.status(200).send(result);
    console.log("student Updated");
  } catch {
    console.log("error in updating student");
  }
};

const deleteStudents = async (req, res) => {
  try {
    const result = await prisma.student.delete({
      where: { email: req.body.email },
    });
    console.log("user deleted");
    res.send(result);
  } catch {
    console.log("issue is student deletion");
  }
};
module.exports = { createStudent, getStudent, updateStudents, deleteStudents };
