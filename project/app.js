const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const MahasiswaRouter = require("./routes/Mahasiswa");
app.use("/mahasiswa", MahasiswaRouter);


module.exports = app;
