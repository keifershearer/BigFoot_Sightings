const express = require('express');
const router = express.Router();



// RENDER HOME PAGE
router.get("/", (req, res, next) => {
  res.render("index");
});




// LINK TO THE AUTH FILE 
router.use('/', require('./auth.routes'))


// LINK TO THE SIGHTING FILE
router.use('/', require('./sighting.routes'))


// LINK TO THE PROFILE FILE
router.use('/profile', require('./profile.routes'))



module.exports = router;
