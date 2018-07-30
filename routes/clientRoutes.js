const express        = require('express');
const clientRouter   = express.Router();
const Client         = require('../models/client-Info');
const bcrypt         = require('bcryptjs')
const passport       = require('passport');
const ensureLogin    = require('connect-ensure-login').ensureLoggedIn;


clientRouter.get('/clientInfo', ensureLogin('/login'), (req, res, next) => {
    res.render('clientInfo', {user: req.user})
});

clientRouter.post('/clientInfo', ensureLogin('/login'), (req, res, next) => {
    console.log('body  = = = == ', req.body);
    const company = req.body.company;
    const address = req.body.address;
    const numberOfElevators = req.body.elevators;
    const numberOfFloors = req.body.floors;
    const service = req.body.service;
    const email = req.body.email;
    const reviewer = req.body.reviewer
    const phoneNumber = req.body.phoneNumber
    // if statment is to make sure the fields are filled out before actually submiting to the server

    if (company === "" || address === "" || numberOfElevators === "" || numberOfFloors === "") {
        res.render('clientInfo', { errorMessage: "Please make sure all fields are filled" });
        return;
    }
    Client.create({
        companyName: company,
        email: email,
        address: address,
        elevators: numberOfElevators,
        floors: numberOfFloors,
        service: service,
        reviews: reviewer,
        phoneNumber: phoneNumber
    })
        .then((response) => {
            console.log('Client info is in the database', response);
            res.redirect('/');
        })
        .catch((err) => {
            next(err);
        })
});


// // route to render the paid clients review page
// clientRouter.get('/testimonials', ensureLogin('/login'), (req, res, next) => {
//     res.render('testimonials')
// });


//route to the about us page 
clientRouter.get('/aboutUs', (req, res, next) => {
    res.render('about-us')
});

//route to the contact us page
clientRouter.get('/contactUs', (req, res, next) => {
    res.render('contact-Us')
});



module.exports = clientRouter;