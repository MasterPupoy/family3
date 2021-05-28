const mongoose = require('mongoose');
const { Schema } = mongoose;

const relationshipSchema = new Schema({
    person1 : [{
        person_Id : {
            type : String
        }, 
        firstname : {
            type : String
        },
        lastname : {
            type : String
        }
    }],
    person2 : [{
        person_Id : {
            type : String
        }, 
        firstname : {
            type : String
        },
        lastname : {
            type : String
        }
    }],
    children : [{
        children_id : {
            type : String
        },
        firstname : {
            type : String
        }
    }]   
});

// export relationship model as Relationship
module.exports = mogoose.model('Relationship', relationshipSchema);