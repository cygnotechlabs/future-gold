const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./Config/db');


//DOTENV
dotenv.config();

//MONGODB CONNECTION
connectDB();


//REST OBJECT
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
// app.use("/api/v1/auth", require("./routes/userRoutes"));

app.use("/api/v1/auth", require("./Routes/userRoutes"));

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, ()=>{
    console.log(`Server Running ${PORT}`.bgGreen.white);
    
})