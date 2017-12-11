const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults
db.defaults({ contacts: [] }).write();

// Routes
require("./app/routes")(app, db);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
