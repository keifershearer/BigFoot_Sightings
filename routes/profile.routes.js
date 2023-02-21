const express = require('express');
const router = express.Router();
const Sighting = require('../models/Sighting.model')
const User = require('../models/User.model')
//const isLogin = require('./../middleware/isLogin')



// RENDER PROFILE PAGE —————>  /
router.get('/:profileId', async (req, res, next) => {
    try {
        console.log(req.params);
        const user = await User.findById(req.params.profileId).populate('userSightings')
        res.render('profile', { user })
    } catch (err) {
        console.log(err)
    }


})



// MAKE A MIDDLEWARE ———————————————————————> IS IT THEIR PROFILE

// LINK THE SIGHTINGS WITH THE USER_ID —————> USER_ID & SIGHTING_ID

// LINK THE COMMENTS THEY DID ——————————————> AUTHOR




module.exports = router;