const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createMeetup = async (req, res) => {
  try {
    const data = {
      id: req.body.id,
      title: req.body.title,
      image: req.body.image,
      address: req.body.address,
      description: req.body.description,
    };

    const result = await prisma.meetups.create({
      data: data,
    });
    res.status(200).send(result);
    console.log("Meetup created");
  } catch {
    console.log("Error");
    res.send("Meetup issues").status(500);
  }
};

const getMeetup = async (req, res) => {
  try {
    const result = await prisma.meetups.findMany();
    res.send(result);
    console.log("Received");
  } catch {
    console.log("error");
    res.send("Not found");
  }
};

const updateMeetup = async (req, res) => {
  try {
    const result = await prisma.meetups.update({
      where: {
        id: req.body.id,
      },
      data: {
        address: req.body.address,
      },
    });
    res.send(result);
    console.log("Updated");
  } catch {
    console.log("error");
    res.send("Not found");
  }
};

const deleteMeetup = async (req, res) => {
  try {
    const result = await prisma.meetups.delete({
      where: { id: req.body.id },
    });
    res.send(result);
    console.log("Deleted");
  } catch {
    console.log("error");
    res.send("Not found");
  }
};

module.exports = { createMeetup, getMeetup, deleteMeetup, updateMeetup };
