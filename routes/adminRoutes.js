const express = require('express');
const router = express.Router();
const Client = require('../models/client-Info');
const ensureLogin = require('connect-ensure-login').ensureLoggedIn;



router.get('/admin/dashboard', ensureLogin('/login'), (req, res, next) => {
    if (req.user.userType !== 'admin') {
        res.redirect('/clientInfo')
    }
    Client.find()
        .then(allClientsInfo => {
            res.render('admin/admin-dashboard', { clientInfo: allClientsInfo });
        })
        .catch(err => next(err))
});

router.get('/admin/client/:id', ensureLogin('/login'), (req, res, next) => {
    const clientId = req.params.id;
    Client.findById(clientId)
        .then(client => {
            res.render('admin/client-detail-edit', { client: client })
        })
        .catch(err => next(err))
})

router.post('/client/:id/edit', ensureLogin('/login'), (req, res, next) => {
    const clientId = req.params.id;
    const updates = {
        companyName: req.body.editedCompany,
        email: req.body.editedEmail,
        address: req.body.editedAddress,
        elevators: req.body.editedElevators,
        floors: req.body.editedFloors,
        paid: req.body.paid,
        myComment: req.body.myComment
    }
    Client.findByIdAndUpdate(clientId, updates)
        .then(() => {
            res.redirect('/admin/dashboard')
        })
        .catch(err => next(err))
})
// Delete block for the comments 
router.post('/client/:id/delete',ensureLogin('/login'), (req, res, next) => {
    const clientId = req.params.id;
    Client.findByIdAndRemove(clientId)
        .then(() => {
            res.redirect('/admin/dashboard')
        })
        .catch(err => next(err))
})



module.exports = router;
