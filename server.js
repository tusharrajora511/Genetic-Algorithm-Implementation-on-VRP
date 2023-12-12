const http = require("http");
const app = require("./app");

const dotnev = require("dotenv");
dotnev.config({
  path: `./config.env`,
});
const mongoose = require("mongoose");
// Connecting our databse
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(function (connect) {
    // console.log(connect.connections);
    console.log("DB connection successful");
  });

const port = process.env.PORT || 7000;
// Creating a server
const server = http.createServer(app);
// Listening to the server
server.listen(port);

