const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const path = require("path");
const ApiError = require("./utils/ApiError");
const cors = require("cors");

const { fileParser } = require("express-multipart-file-parser");

const app = express();
app.use(cors());

const PORT = 5000;

app.use(express.json());

app.use(
  fileParser({
    rawBodyOptions: {
      limit: "30mb", //file size limit
    },
    busboyOptions: {
      limits: {
        fields: 50, //Number text fields allowed
      },
    },
  })
);

app.use("/api/v1", routes);
dotEnv.config({ path: path.join(__dirname, "./.env") });

const { MONGODB_URL } = process.env;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...", error);
    process.exi;
  });
app.listen(PORT, () => console.log("serverr Running"));
