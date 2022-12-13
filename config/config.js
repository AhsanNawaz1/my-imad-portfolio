const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(process.env.PORT || 3000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    DB_NAME: Joi.string().required().description("DB Name"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    AWS_ACCESS_KEY: Joi.string().required().description("Aws Access key."),
    AWS_SECRET_KEY: Joi.string().required().description("Aws Secret key."),
    AWS_BUCKET: Joi.string().required().description("Aws Bucket Name."),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which verify email token expires"),

    TWILIO_ACCOUNT_SID: Joi.string().required().description("twilio acc SID."),
    TWILIO_AUTH_TOKEN: Joi.string()
      .required()
      .description("twilio acc auth Token ."),
    TWILIO_SERVICE_SID: Joi.string()
      .required()
      .description("twilio service SID ."),
    TWILIO_SENDGRID_API_KEY: Joi.string()
      .required()
      .description("Twilio send grid Api Key"),
    TWILIO_SENDGRID_TEMPLATE_ID: Joi.string()
      .required()
      .description("Twilio send grid template ID"),
    SG_API_KEY: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  AUTH_HEADER_PREFIX: "Bearer ",
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      dbName: envVars.DB_NAME,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  aws: {
    accessKeyId: envVars.AWS_ACCESS_KEY,
    secretAccessKey: envVars.AWS_SECRET_KEY,
    bucket: envVars.AWS_BUCKET,
  },
  email: {
    // smtp: {
    //   host: envVars.SMTP_HOST,
    //   port: envVars.SMTP_PORT,
    //   auth: {
    //     user: envVars.SMTP_USERNAME,
    //     pass: envVars.SMTP_PASSWORD,
    //   },
    // },
    from: envVars.EMAIL_FROM,
    sendGridApiKey: envVars.SG_API_KEY,
  },
  twilio: {
    accountSid: envVars.TWILIO_ACCOUNT_SID,
    authToken: envVars.TWILIO_AUTH_TOKEN,
    serviceSid: envVars.TWILIO_SERVICE_SID,
    sendGridApiKey: envVars.TWILIO_SENDGRID_API_KEY,
    sendGridTempId: envVars.TWILIO_SENDGRID_TEMPLATE_ID,
  },
};
