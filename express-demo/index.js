/** @format */
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const logger = require("./middleware/Logger");

const app = express();
const Joi = require("joi");

app.set("view enging", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("./");

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    startupDebugger("Morgaan Enabled...");
}

dbDebugger("connected to the database...");

//configuration
console.log(`Apllication Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
// console.log(`Mail Password: ${config.get("mail.password")}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));