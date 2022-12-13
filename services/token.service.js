const jwt = require("jsonwebtoken");
const moment = require("moment");
const httpStatus = require("http-status");
const config = require("../config/config");
const TokenModel = require("../models/token.model");
const UserModel = require("../models/user");
const ApiError = require("../utils/ApiError");
const tokenTypes = require("../config/token");

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, type, secret = config.jwt.secret) => {
  try {
    const payload = {
      sub: userId,
      type: type,
      iat: moment().unix(),
    };
    // console.log("payload:", payload);
    return jwt.sign(payload, secret);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, type, expires, blacklisted = false) => {
  try {
    const payload = {
      token: token,
      user: userId,
      type: type,
    };
    return await TokenModel.create(payload);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  try {
    const payload = jwt.verify(token, config.jwtSecret, null, null);
    const tokenDoc = await TokenModel.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    });
    if (!tokenDoc) {
      throw new Error("Token not found");
    }
    return tokenDoc;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  try {
    // console.log("User in Generate Auth Token : ", user);
    const accessToken = generateToken(user._id, tokenTypes.tokenTypes.ACCESS);
    // console.log("aaa > ", accessToken);
    // console.log("tokken type", tokenTypes);
    await saveToken(accessToken, user._id, tokenTypes.tokenTypes.ACCESS);
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

const generateResetPasswordToken = async (userEmail) => {
  try {
    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "No users found with this email"
      );
    }
    const expires = moment().add(
      config.jwt.resetPasswordExpirationMinutes,
      "minutes"
    );
    const resetPasswordToken = generateToken(
      user.id,
      tokenTypes.RESET_PASSWORD
    );
    await saveToken(
      resetPasswordToken,
      user.id,
      tokenTypes.RESET_PASSWORD,
      expires
    );
    return resetPasswordToken;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user) => {
  try {
    const expires = moment().add(
      config.jwt.verifyEmailExpirationMinutes,
      "minutes"
    );
    const verifyEmailToken = generateToken(
      user.id,
      expires,
      tokenTypes.VERIFY_EMAIL
    );
    await saveToken(
      verifyEmailToken,
      user.id,
      expires,
      tokenTypes.VERIFY_EMAIL
    );
    return verifyEmailToken;
  } catch (error) {
    console.log(error);
  }
};

const removeToken = async (user) => {
  try {
    return await TokenModel.findOneAndDelete({ user: user.id });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  removeToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
