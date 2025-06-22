const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const passport=require('./auth');

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body
const PORT=process.env.PORT || 3000;

// Middleware function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] Requested made to : ${req.originalUrl}`);
  next(); // move on to the next phase 
}

app.use(logRequest)

app.use(passport.initialize())

const localAuthMiddleware=passport.authenticate('local', {session:false});

app.get("/",localAuthMiddleware, (req, res) => {
  res.send("Welcome to our Hotels")
});


// import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes=require('./routes/menuItemRoutes')

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(3000, () => {
  console.log("server is running on the port 3000");
});
