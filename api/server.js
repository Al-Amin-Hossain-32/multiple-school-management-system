const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser');

//ROUTER IMPORT
const schoolRouter = require("./routers/school.router")


const app = express();
const corsOption= {exposedHeaders:"Authorization"}
app.use(cors(corsOption))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//MOngoDB Conection

mongoose.connect('mongodb://127.0.0.1:27017/schoolManagment').then(db=>{
    console.log("MongoDB is Connectd")
}).catch(e=>{
    console.log("MongoDb ERROr",e)
});


const PORT = process.env.PORT || 5000 ;
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  // SCHOOOL ROUTERS
  app.use("/api/school",schoolRouter)

  //CLASS ROUTERS
  const classRoutes = require("./routers/class.router.js");
app.use('/api/classes', classRoutes);

 //STUDENT ROUTERS
 const studetRoutes = require("./routers/student.router.js")
 app.use("/api/student",studetRoutes)
 
//FEES ROUTE IMPORT
const feeRoutes = require("./routers/fee.router");
app.use("/api/fees", feeRoutes);


  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })

