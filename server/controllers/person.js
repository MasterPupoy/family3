// import person and relationship schema for manipulation
const Person = require('../models/Person');
const Family = require('../models/Family')
// error catcher function
const errCatcher = require('../helpers');

// create a new person 
module.exports.createPerson = (params) => {
    
    let newPerson = new Person({
        firstname : params.firstName,
        lastname : params.lastName,
        gender : params.gender,
        birthdate : params.birthdate,
        occupation : params.occupation,
        address : params.address
    });

   return newPerson.save().then((person, err) => {
       
    return err ? errCatcher(err) : true;

   });
};

// return all persons 
module.exports.getEveryone = (params) => {
    return Person.find().then(persons => {
        return persons;
    })
};

// find person 
module.exports.findPerson = (params) => {
    
    return Person.find({
        firstname : params.firstName,
        lastname : params.lastName
    }).then(person => {
        console.log(person)
            
        return person;
  
    });
}

// add children to person 
module.exports.addChildren = (params) => {

    // pass the relationship id of the person having children
    
    // identify and push the children to the peron's array first then push 
    // person's family details to the children's parents array.
    let children = {
        child_id : params.children_id,
        firstname : params.firstName,
        lastname : params.lastName
    };
    
    return Person.findById(params.parent_id).then(person => {
        person.children.push(children)

        return person.save().then((person, err) => {

            return Person.findById(params.children_id).then(person => {

                if (person) {
                    return Family.findById(params.currentFamily_id).then(family => {

                        family.children.push(children);

                        return family.save().then(family => {

                            let fam = {
                                family_id : family.family_id,
                                parent1 : {
                                    id : family.parent1.person_Id,
                                    firstname : family.parent1.firstname,
                                    lastname : family.parent1.lastname
                                },
                                parent2 : {
                                    id : family.parent2.person_Id,
                                    firstname : family.parent2.firstname,
                                    lastname : family.parent2.lastname
                                }
                            };
                            

                            return Person.findById(params.children_id).then(person => {

                                person.parents.push(fam);
                                
                                // return true if child, family and person was successfully updated
                                return person.save().then((person, err) => {

                                    return Person.findById(family.parent2.person_Id).then(person => {
                                        
                                       person.children.push(children);

                                       return person.save().then((person, err) => (err) ? errCatcher(err) : true);
                                    })
                                });
                            })
                        });
                    });
                };
            });
        });
    });
};



