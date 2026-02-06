const express = require("express");
const os = require("os");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const http = require("http");
const server = http.createServer(app);

require("dotenv").config();
const host = process.env.API_HOST || process.env.DEVELOP_API_HOST;
const port = process.env.API_PORT || process.env.DEVELOP_API_PORT;

server.listen(port, host, () =>
  console.log(`Successfully server run on http://${host}:${port}`)
);

const cors = require("cors");
app.use(cors("*"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ---------- MongoDB Connect ----------

const dbConfig = require("./config/db.config");
const db = require("./models");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    // .connect(`mongodb://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// ---------- MongoDB Connect ----------

// ---------- Service Routes ----------

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard/", (req, res) => {
  res.render("dashboard");
});

app.get("/config-admin/user", (req, res) => {
  res.render("user");
});

app.get("/indicators", (req, res) => {
  res.render("indicators");
});

app.get("/create-indicators", (req, res) => {
  res.render("create-indicators");
});

app.get("/basic-value", (req, res) => {
  res.render("basic-value");
});

app.get("/basic-value-variable", (req, res) => {
  res.render("basic-value-variable");
});

app.get("/agency", (req, res) => {
  res.render("agency");
});

app.get("/group", (req, res) => {
  res.render("group");
});

app.get("/work-group", (req, res) => {
  res.render("work-group");
});

app.get("/year", (req, res) => {
  res.render("year");
});


// ---------- Routes ----------

require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/work-group.route")(app);
require("./routes/agency.route")(app);
require("./routes/value.route")(app);
require("./routes/basic-value.route")(app);
require("./routes/basic-value-variable.route")(app);
require("./routes/indicators.route")(app);
require("./routes/year.route")(app);
require("./routes/group.route")(app);

// ---------- Service Routes ----------

// ---------- Connect external API ----------

require("./routes/external-api.route")(app);

// ---------- Connect external API ----------

// ---------- Socket IO Connect ----------

const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Success connect Socket.", socket.id);
});

// ---------- Socket IO Connect ----------
