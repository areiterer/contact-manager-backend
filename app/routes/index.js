const contactRoutes = require("./contact_routes");

module.exports = function(app, db) {
  contactRoutes(app, db);
  // Other routes here
};
