const mongoose = require('mongoose');
const { Schema } = mongoose;

const familySchema = new Schema({
    parent1 : {
        person_Id : {
            type : String
        }, 
        firstname : {
            type : String
        },
        lastname : {
            type : String
        }
    },
    parent2 : {
        person_Id : {
            type : String
        }, 
        firstname : {
            type : String
        },
        lastname : {
            type : String
        }
    },
    children : [{
        children_id : {
            type : String
        },
        firstname : {
            type : String
        },
        lastname : {
            type : String
        }
    }]
});

// export relationship model as Relationship
module.exports = mongoose.model('Family', familySchema, 'family');