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
    parents : [{
        relationship_id : {
            type : String,
        },
        person1 : [{
            Id : {
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
           Id : {
                type : String
            },
            firstname : {
                type : String
            },
            lastname : {
                type : String
            } 
        }]
    }],
    relationships : [{
        relationship_id : {
            type : String
        },
        person1 : [{
            Id : {
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
           Id : {
                type : String
            },
            firstname : {
                type : String
            },
            lastname : {
                type : String
            } 
        }] 
    }],
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
    }],
    birthdate : {
        type : Date
    },
});

// export person schema
module.exports = mongoose.model('Person', personSchema)