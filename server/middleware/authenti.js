const jwt = require("jsonwebtoken");
const { sign, verify } = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.status(403);
    //res.send("Authorized");
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
