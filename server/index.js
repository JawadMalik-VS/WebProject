require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const port = 4500;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + "/public"));
// app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cors());

// Routes

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
