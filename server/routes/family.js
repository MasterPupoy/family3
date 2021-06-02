const router = require('express').Router();
const familyController = require('../controllers/family');

// create a family route
router.post('/create-family', (req, res) => {
    // choose from req headers or body for the parent1 id
    let params = {
        parent1 : {
            _id : req.body.parent1.id,
            firstName : req.body.parent1.firstName,
            lastName : req.body.parent1.lastName,
        },
        parent2 : {
            _id : req.body.parent2.id,
            firstName : req.body.parent2.firstName,
            lastName : req.body.parent2.lastName,
        }
    };


    familyController.createFamily(params).then(family => res.send(family));
})

// get all families
router.get('/families', (req, res) => {
    familyController.getFamilies().then(families => res.send(families));
});

// get a family 
router.get('/:id', (req, res) => {
    let familyId = req.params

    familyController.lookForFamily(familyId).then(family => res.send(family));
});

router.get('/fam', (req, res) => {
    let params = {
        firstName : req.body.firstname,
        lastName : req.body.lastname
    };

    familyController.getFamilyByName(params).then(family => res.send(family));
});


module.exports = router;