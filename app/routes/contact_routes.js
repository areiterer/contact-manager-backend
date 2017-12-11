module.exports = function(app, db) {
  app.get("/contacts", (req, res) => {
    const contacts = db.get("contacts").value();
    res.send(contacts);
  });

  app.get("/contacts/:id", (req, res) => {
    const contactId = req.params.id;
    const contacts = db.get("contacts").find({ id: contactId });
    res.send(contacts);
  });

  app.post("/contacts", (req, res) => {
    if (!req.body) {
      res.send({ error: "No contact provided!" });
      return;
    }

    // TODO: Create Contacts here
    const contactId = guid();
    const contact = {
      id: contactId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };

    db
      .get("contacts")
      .push(contact)
      .write()
      .then(() => {
        const createdContact = db
          .get("contacts")
          .find({ id: contactId })
          .value();

        res.send({ message: "Contact created", contact: createdContact });
      });
  });

  app.put("/contacts/:id", (req, res) => {
    if (!req.body) {
      res.send({ error: "No contact provided!" });
      return;
    }

    const contactId = req.params.id;
    db
      .get("contacts")
      .find({ id: contactId })
      .assign(req.body)
      .write()
      .then(() => {
        const createdContact = db
          .get("contacts")
          .find({ id: contactId })
          .value();

        res.send({ message: "Contact updated", contact: createdContact });
      });
  });

  app.delete("/contacts/:id", (req, res) => {
    const contactId = req.params.id;
    db
      .get("contacts")
      .remove({ id: contactId })
      .write()
      .then(() => res.send("Contact removed."));
  });
};

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}
