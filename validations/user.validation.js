const Joi = require("joi");
// const { objectId } = require("../validations/custom.validation");
// const { password } = require("./custom.validation");

// const login = {
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     deviceId: Joi.string().optional(),
//     location: Joi.object()
//       .required()
//       .keys({
//         type: Joi.string().required(),
//         miles: Joi.number().required(),
//         coordinates: Joi.array().items(Joi.number()).required(),
//       }),
//   }),
// };

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

// const addFavCategoriesToUserProfile = {
//   body: Joi.object().keys({
//     categories: Joi.array().required(),
//   }),
// };

// const blockUser = {
//   params: Joi.object().keys({
//     id: Joi.string().custom(objectId).required(),
//   }),
// };

const updateProfile = {
  body: Joi.object()
    .keys({
      firstName: Joi.string().trim().optional(),
      lastName: Joi.string().trim().optional(),
    })
    .min(1),
};

// const addUserFavProduct = {
//   params: Joi.object().keys({
//     id: Joi.string().custom(objectId).required(),
//   }),
// };

// const deleteAccount = {
//   body: Joi.object().keys({
//     reason: Joi.string().required(),
//   }),
// };

// const forgetPassword = {
//   body: Joi.object().keys({
//     newPassword: Joi.string().required().custom(password),
//   }),
// };

// const changePassword = {
//   body: Joi.object().keys({
//     oldPassword: Joi.string().required(),
//     newPassword: Joi.string().required().custom(password),
//   }),
// };
module.exports = {
  //   login,
  //   addFavCategoriesToUserProfile,
  //   blockUser,
  updateProfile,
  //   addUserFavProduct,
  //   deleteAccount,
  //   forgetPassword,
  //   changePassword,
  register,
  login,
};
