module.exports = function(app, db) {
  app.post("/contacts", (req, res) => {
    // TODO: Create Contacts here
    res.send("POST contacts!");
  });
};
