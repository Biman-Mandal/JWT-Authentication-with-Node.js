const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;
var corsOptions = {
  origin: `http://localhost:${PORT}`
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// database
const db = require("./models");
const Role = db.role;
db.sequelize.sync({force:true});

const middleware = (req, res, next) => {
  console.log('URL :',req.method + " : " + req.path);
  next();
};
app.use(middleware);
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Express API is Ready" });
});
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/property.routes')(app);
// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost/${PORT}`);
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "admin"
  });
}