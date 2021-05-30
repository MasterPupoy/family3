const Family = require('../models/Family');
const Person = require('../models/Person');
const errCatcher = require('../helpers');

// create a family and after creating a family, push the parent1 info
// to parent2 partner array and parent2 info to parent1 partner array
module.exports.createFamily = (params) => {

    let newFamily = new Family({
        parent1 : {
            person_Id : params.parent1._id,
            firstname : params.parent1.firstName,
            lastname : params.parent1.lastName,
        },
        parent2 : {
            person_Id : params.parent2._id,
            firstname : params.parent2.firstName,
            lastname : params.parent2.lastName
        }
    });

    let partner1 = {
        person_Id : params.parent1._id,
        firstname : params.parent1.firstName,
        lastname : params.parent1.lastName
    };

    let partner2 = {
        person_Id : params.parent2._id,
        firstname : params.parent2.firstName,
        lastname : params.parent2.lastName
    };

    return newFamily.save().then((family, err) => {
       
        if (err) {
            errCatcher(err);
        }else {
            return Person.findById(params.parent2._id).then(person => {
                person.partner.push(partner1);
                
                // return true if operation is successful
                return person.save().then((person, err) => {
                    if (err) {
                        errCatcher(err);
                    }else{
                        
                        return Person.findById(params.parent1._id).then(person => {
                            person.partner.push(partner2)
 
                            return person.save().then((person, err) => (err) ? errCatcher(err) : true);
                        });
                    };
                });
            });
        };
    });
};

