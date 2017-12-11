module.exports = function(app, db) {
  app.post("/contacts", (req, res) => {
    // TODO: Create Contacts here

    console.log(req.body);
    res.send("POST contacts!");
  });
};
