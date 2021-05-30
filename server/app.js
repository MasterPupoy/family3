const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// routes
const personRoutes = require('./routes/person');
const familyRoutes = require('./routes/family');

const PORT = process.env.PORT;
const DB_URI = process.env.DB;

// set-up middleware
app.use(cors()); // use cors to allow cross origin resource sharing to enable fetching from front end
app.use(bodyParser.urlencoded({extended : true})); // for parsing req.body
app.use(bodyParser.json());
app.use(express.urlencoded({extended : true})); 
app.use(express.json());

// connect to mongodb atlas 
mongoose.connect(`${DB_URI}`, {
    useUnifiedTopology : true,
    useNewUrlParser : true
})

mongoose.connection.once('open', () => console.log(`Connected to MongoDB Atlas`));


// set up routes
app.use('/person', personRoutes);
app.use('/family', familyRoutes);



// listen for request on port 5000 
app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`);
})