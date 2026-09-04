const express = require('express');
const app = express()
const cors = require("cors");


//env ka data load karo
require("dotenv").config();

// default middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is Home Page')
})

// database connection
const connectDB = require('./config/database');
connectDB();



// cookie-parser - what is this and why we need this..???

const cookieParser = require("cookie-parser");
app.use(cookieParser());




// API mount karna hai
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

app.use('/api/v1/user', userRoutes);

app.use('/api/v1/candidate', candidateRoutes); // only by Admin Role


//const PORT = process.env.PORT;
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Voting app listening on port ${PORT}`)
})