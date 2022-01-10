const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./models");

// load enviroment variables
dotenv.config({});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Simple crud app" });
});

db.sequelize.sync();

require("./routes/userRoutes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
