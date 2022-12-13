const mongoose = require("mongoose");
// const { toJSON } = require("./plugins");
const tokenTypes = require("../config/token");

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      // required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.ACCESS, tokenTypes.RESET_PASSWORD],
      required: true,
    },
    expires: {
      type: Date,
      required: false,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// tokenSchema.plugin(toJSON);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
