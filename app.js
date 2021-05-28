const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT;

// set-up middleware
app.use(cors); // use cors to allow cross origin resource sharing to enable fetching from front end
app.use(bodyParser); // for parsing req.body
app.use(express.urlencoded({extended : true})); 

// connect to mongodb atlas 
mongoose.connect(`mongodb+srv://master_pupoy:wi7nB3Tv78go5DJQ@cluster1.zhjgs.mongodb.net/maintsys?retryWrites=true&w=majority`, {
    useUnifiedTopology : true,
    useNewUrlParser : true
})

mongoose.connection.once('open', () => console.log(`Connected to MongoDB Atlas`));


// set up routes




// listen for request on port 5000 
app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`);
})