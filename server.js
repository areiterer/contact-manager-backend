const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");

const adapter = new FileAsync("db.json");
low(adapter).then(db => {
  // Set some defaults
  db.defaults({ contacts: [] }).write();

  // ## CORS middleware
  //
  // see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
  var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // intercept OPTIONS method
    if ("OPTIONS" == req.method) {
      res.send(200);
    } else {
      next();
    }
  };

  app.use(allowCrossDomain);

  // Routes
  require("./app/routes")(app, db);

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
});
