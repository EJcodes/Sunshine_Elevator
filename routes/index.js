const express = require('express');
const router  = express.Router();
const Client  = ("../models/client-info");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
