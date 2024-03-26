const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser')





const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/reviews', require('./routes/reviewsRoutes'))


//MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> console.log("Connected to MongoDB Atlas"))
    .catch((error)=> console.error(error));

app.listen(PORT, () => console.log("server listening on port 💖", PORT));