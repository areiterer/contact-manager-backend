const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

const adapter = new FileAsync("db.json");
low(adapter).then(db => {
  // Set some defaults
  db.defaults({ contacts: [] }).write();

  // Routes
  require("./app/routes")(app, db);

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
});
