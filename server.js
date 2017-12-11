const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
require("./app/routes")(app, {});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
