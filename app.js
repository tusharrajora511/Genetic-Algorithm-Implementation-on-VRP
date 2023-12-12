const express = require("express");
const app = express();
const viewRouter = require("./api/routes/viewRoutes");
const userRouter = require("./api/routes/userRoutes");

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", viewRouter);
app.use("/home", viewRouter);
app.use("/api/users", userRouter);

module.exports = app;
