const bcrypt = require("bcrypt");

hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  let hashPass = await bcrypt.hash(pass, salt);
  return hashPass;
};

unHashPassword = async (reqPass, userPass) => {
  let valid = await bcrypt.compare(reqPass, userPass);
  return valid;
};

deletePassword = async (mongoObject) => {
  jsObject = mongoObject.toObject();
  delete jsObject.password;
  return jsObject;
};

module.exports = { hashPassword, unHashPassword, deletePassword };
