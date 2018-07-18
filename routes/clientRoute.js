const express         = require('express');
const clientRouter      = express.Router();
const Client          = require('../models/client-Info');
const bcrypt 		  = require('bcryptjs')
const passport 		  = require('passport');
const ensureLogin	  = require('connect-ensure-login');

clientRouter.get('/clientInfo', (req, res, next) =>{
    res.render('clientInfo')
});

clientRouter.post('/clientInfo', (req, res, next)=>{
    
});






module.exports = clientRouter;