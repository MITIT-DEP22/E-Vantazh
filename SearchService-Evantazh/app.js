require("dotenv").config();
require("./src/db/connect.db");
require("./src/db/init.db");

const https = require("https");
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");

const options = {
    key: fs.readFileSync(path.resolve(__dirname, "./ssl/privkey1.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "./ssl/fullchain1.pem")),
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("*", cors());

app.use("/api/v1", require("./src/api/routes"));

const server = https.createServer(options, app);

const {PORT} = require("./src/config/application.config");
server.listen(
    PORT,
    () => console.log(`Server is running on ${PORT} port`)
);
