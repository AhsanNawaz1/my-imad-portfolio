const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    let temp = [];
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return res.status(400).send({
      data: [],
      status: 400,
      error: errorMessage,
    });
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
