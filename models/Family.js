const mongoose = require('mongoose');
const { Schema } = mongoose;

const familySchema = new Schema({
    unique_Family_Id : {
        type : String
    },
    family_Name : {
        type : String
    },
    origin : {
        type : String
    },
    members : [{
        person_Id : {
            type : String
        },
        firstname : {
            type : String
        },
        lastname : {
            type : String
        }
    }]
})