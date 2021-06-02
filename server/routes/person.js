const router = require('express').Router();
const personController = require('../controllers/person');


// create a person on post route
router.post('/create', (req, res) => {
    personController.createPerson(req.body).then(status => res.send(status));
})

// find person route
router.post('/find', (req, res) => {
    personController.findPerson(req.body).then(person => res.send(person));
})

// add child to parent
router.put('/setChild', (req, res) => {
    let params = {
        parent_id : req.body.parent_id,
        currentFamily_id : req.body.family_id,
        children_id : req.body.children_id,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    }
    
    personController.addChildren(params).then(modifiedPerson => res.send(modifiedPerson));
});

// get everyone
router.get('/everyone', (req, res) => {
    
    personController.getEveryone().then(everyone => res.send(everyone));
});

router.get('/:userId', (req, res) => {

    let userId = req.params.userId;

    personController.getPersonById(userId).then(person => res.send(person));
});

module.exports = router;