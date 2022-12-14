const Joi = require("joi");

const addProject = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    stacks: Joi.string().required(),
  }),
};

module.exports = { addProject };
