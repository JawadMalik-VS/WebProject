const STRINGS = require("../utils/text");
const prisma = require("../prisma/index");
const AuthService = require("../services/auth.service");
const { Roles } = require("@prisma/client");
/**
 * If no role is passed the default role is user
 *
 * @param  {String} role role allowed to access the route
 */

function auth(role = "") {
  // roles = roles.length > 0 && roles : role.USER;
  return async (req, res, next) => {
    const header = req.get("Authorization");
    if (!header || !header.startsWith("Bearer")) {
      return res.status(401).json({ message: STRINGS.ERRORS.tokenInvalid });
    }

    try {
      const token = header.split(" ")[1];

      const decoded = await AuthService.generateVerifyToken(
        token,
        process.env.JWT_SECRET
      );

      // let role = role;
      let _id = String(decoded.id);

      let user = await prisma.user.findFirst({
        where: {
          id: _id,
        },
      });
      if (!user)
        return res.status(401).json({ message: STRINGS.ERRORS.userNotFound });

      //CHECKING IF USER LIST HAS ROLE OR NOT
      if (!user?.role.includes(role))
        return res.status(401).json({ message: STRINGS.ERRORS.unAuthorized });
      req.user = user;
      req.userId = user.id;
      next();
    } catch (err) {
      console.log("err--->", err);
      return res.status(401).json({ message: STRINGS.ERRORS.tokenExpired });
    }
  };
}

module.exports = auth;
