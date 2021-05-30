const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    firstname : { 
        type : String,
        default : 'N/a'
    },
    lastname : {
        type : String,
        default : 'N/a'
    },
    gender : {
        type : String, 
    },
    currentFamily_id : {
        type : String,
    },
    parents : [{
        family_id : {
            type : String,
        },
        parent1 : {
            Id : {
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
           Id : {
                type : String
            },
            firstname : {
                type : String
            },
            lastname : {
                type : String
            } 
        },
    }],
    partner : [{
        person_id : {
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
        child_id : {
            type : String
        },
        firstname : {
            type : String
        },
        lastname : {
            type : String
        }
    }],
    birthdate : {
        type : Date
    },
    occupation : {
        type : String,
        default : 'N/a'
    },
    address : {
        type : String,
        default : 'N/a'
    }
});

// export person schema
module.exports = mongoose.model('Person', personSchema, 'persons');