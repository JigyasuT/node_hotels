const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config()

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

const PORT=process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Wlcome to our hotels");
});



// import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes=require('./routes/menuItemRoutes')

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);



app.listen(3000, () => {
  console.log("server is running on the port 3000");
});
