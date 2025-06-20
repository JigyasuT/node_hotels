const mongoose=require('mongoose')

//define the MongoDB connection url

const mongoURL='mongodb://localhost:27017/Hotels'

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