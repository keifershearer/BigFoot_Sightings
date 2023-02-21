const express = require('express');
const router = express.Router();
const Sighting = require('../models/Sighting.model')
const User = require('../models/User.model')
const isLogin = require()



// RENDER PROFILE PAGE —————>  /
router.get('/:profileId', isLogin, (res, req, next) => {
    res.render('profile', { user })
})



// MAKE A MIDDLEWARE ———————————————————————> IS IT THEIR PROFILE

// LINK THE SIGHTINGS WITH THE USER_ID —————> USER_ID & SIGHTING_ID

// LINK THE COMMENTS THEY DID ——————————————> AUTHOR




module.exports = router;