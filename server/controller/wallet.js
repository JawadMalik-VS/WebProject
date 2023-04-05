const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var WAValid = require("multicoin-address-validator");

// const createWallet = async (req, res) => {
//   try {
//     const data = req.body;
//     const result = await prisma.wallet.create({
//       data: data,
//     });
//     console.log("here", result);
//     res.status(200).send("It worked");
//     console.log("Wallet Created");
//   } catch (err) {
//     res.status(500).send("Not working");
//     console.log("issue in Wallet creation");
//   }
// };

const ValidWallet = async (req, res) => {
  try {
    const data = req.body;
    const address = req.body.address;
    const symbol = req.body.symbol;
    console.log(data);

    // console.log("here", result);
    var valid = WAValid.validate(address, symbol);
    if (valid) {
      await prisma.wallet.create({
        data: data,
      });
      res.status(200).send("you created wallet successfully ");
      console.log("This is a valid address");
    } else {
      console.log("address invalid");
      res.send("Not valid Address");
    }
  } catch {
    console.log("Not working");
    res.status(500).send("Issue occur");
  }
};

const getWallets = async (req, res) => {
  try {
    const result = await prisma.wallet.findMany();
    console.log("wallets found");
    res.send(result);
  } catch {
    console.log("Error in wallet finding");
    res.send("Wallet doesn't exist");
  }
};

module.exports = { ValidWallet, getWallets };
