const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTeacher = async (req, res) => {
  try {
    const data = {
      id: req.body.id,
      name: req.body.name,
      course: req.body.course,
    };

    const result = await prisma.teacher.create({
      data: data,
    });
    res.status(200).send("It worked");
    console.log("Teacher Created");
  } catch (err) {
    res.status(500).send("Not working");
    console.log("issue in Teacher creation");
  }
};

const getTeacher = async (req, res) => {
  try {
    const result = await prisma.teacher.findMany();
    console.log("teachers received");
    res.status(200).send(result);
  } catch {
    console.log("Issue in getting teachers");
  }
};

const updateTeachers = async (req, res) => {
  try {
    const result = await prisma.teacher.update({
      where: { id: req.body.id },
      data: { course: req.body.course },
    });
    res.status(200).send(result);
    console.log("Teacher Updated");
  } catch {
    console.log("error in updating Teacher");
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const result = await prisma.teacher.delete({
      where: { id: req.body.id },
    });
    console.log("user deleted");
    res.send(result);
  } catch {
    console.log("issue is student deletion");
  }
};
module.exports = { createTeacher, getTeacher, updateTeachers, deleteTeacher };
