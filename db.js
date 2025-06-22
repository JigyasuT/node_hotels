const mongoose=require('mongoose')
require('dotenv').config();
//define the MongoDB connection url

// const mongoURL='mongodb://localhost:27017/Hotels'
// const mongoURL = 'mongodb+srv://jigyasuti:jigyasutiwari2005@cluster100.9vesa6m.mongodb.net/'
const mongoURL=process.env.MONGODB_URL_LOCAL;
// const mongoURL=process.env.MONGODB_URL;

// set up MongoDB connection
mongoose.connect(mongoURL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})

// get the default connection
//mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;


//define event listerns for databases connection

db.on('connected',()=>{
  console.log('Connected to MongoDB server')
})

db.on('error',()=>{
  console.log(' MongoDB Connected to error')
})

db.on('disconnected',()=>{
  console.log(' MongoDB disconnected')
})

//Export the database connection
module.exports=db;