const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB

// set-up middleware
app.use(cors); // use cors to allow cross origin resource sharing to enable fetching from front end
app.use(bodyParser); // for parsing req.body
app.use(express.urlencoded({extended : true})); 

// connect to mongodb atlas 
mongoose.connect(`${DB_URI}`, {
    useUnifiedTopology : true,
    useNewUrlParser : true
})

mongoose.connection.once('open', () => console.log(`Connected to MongoDB Atlas`));


// set up routes




// listen for request on port 5000 
app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`);
})