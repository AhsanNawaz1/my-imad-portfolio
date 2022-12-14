const mongoose = require("mongoose");

const stacksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      require: true,
    },
  },
  { timestamps: true }
);

const Stacks = mongoose.model("Project", stacksSchema);
module.exports = Stacks;
