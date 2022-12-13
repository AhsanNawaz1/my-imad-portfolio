// interceptor for protected calls
const JWT = require("jsonwebtoken");
const CONFIG = require("../config/config");
const TokenModel = require("../models/token.model");
const UserModel = require("../models/user");

const AUTHENTICATE = (req, res, next) => {
  try {
    // console.log("REQ TOKEN : ", req.headers.authorization);
    // console.log("REQ BODY : ", req.body);
    // console.log("REQ files : ", req.files);
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith(CONFIG.AUTH_HEADER_PREFIX)
    ) {
      Unauthorized(res);
      return;
    }
    const authToken = req.headers.authorization.split(" ")[1];
    JWT.verify(authToken, CONFIG.jwt.secret, async (err, decoded) => {
      // console.log("decoded : ", decoded);
      if (err) {
        Unauthorized(res);
        return;
      } else {
        if (!decoded || !decoded.sub) {
          Unauthorized(res);
          return;
        } else {
          let userId = decoded.sub;
          let reqType = decoded.type;
          const user = await UserModel.findById(userId);
          if (!user) {
            Unauthorized(res);
          }
          const findToken = await TokenModel.findOne({ user: userId });
          if (findToken) {
            req.userId = userId;
            req.reqType = reqType;
            next();
          } else {
            Unauthorized(res);
          }
        }
      }
    });
  } catch (e) {
    console.log("Auth middleware fail: ", e.message);
  }
};

const Unauthorized = (res) => {
  res.status(403).send({
    status: 403,
    message: "Unauthorized",
  });
};

module.exports = {
  AUTHENTICATE,
};
