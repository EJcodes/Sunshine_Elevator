const express = require('express');
const router  = express.Router();
const Client = require('../models/client-Info');

/* GET home page */
router.get('/admin/dashboard', (req, res, next) => {
    Client.find()
    .then( allClientsInfo => {
        res.render('admin/admin-dashboard', { clientInfo: allClientsInfo });
    } )
    .catch( err => next(err) )
});

router.get('/admin/client/:id', (req, res, next) => {
    const clientId = req.params.id;
    Client.findById(clientId)
    .then( client => {
        res.render('admin/client-detail-edit', {client: client })
    } )
    .catch( err => next(err) )
})

router.post('/client/:id/edit', (req, res, next) => {
    const clientId = req.params.id;
    const updates = {
        companyName: req.body.editedCompany, 
        address: req.body.editedAddress , 
        elevators: req.body.editedElevators, 
        floors: req.body.editedFloors, 
        paid: req.body.paid,
        myComment: req.body.myComment
    }
    Client.findByIdAndUpdate(clientId, updates)
    .then( () => {
        res.redirect('/admin/dashboard')
    } )
    .catch( err => next(err) )
})

router.post('/client/:id/delete', (req, res, next) => {
    const clientId = req.params.id;
    Client.findByIdAndRemove(clientId)
    .then( () => {
        res.redirect('/admin/dashboard')
    } )
    .catch( err => next(err) )
})



module.exports = router;
