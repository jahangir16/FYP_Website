const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const productController = require("../FYP_Website/app/controllers/product.controller.js");
const productRoutes = require("../FYP_Website/app/routes/product.routes.js");

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to FYP application." });
});

// Include product routes
productRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
