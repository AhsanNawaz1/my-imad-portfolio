const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      require: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      // required: true,
    },
    description: {
      type: String,
      trim: true,
      require: true,
    },
    stacks: {
      type: String,
      trim: true,
      require: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
