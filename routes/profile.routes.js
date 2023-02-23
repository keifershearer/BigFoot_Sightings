const express = require('express');
const router = express.Router();
const Sighting = require('../models/Sighting.model')
const User = require('../models/User.model')
//const isLogin = require('./../middleware/isLogin')


// RENDER PROFILE PAGE —————>  /
router.get('/', async (req, res, next) => {
    try {
        const sightings = await Sighting.find({ owner: req.session.currentUser._id })
        const user = await User.findById(req.session.currentUser._id)
        res.render('profile', { user, sightings })

    } catch (err) {
        next(err)
    }
})


router.get('/:profileId', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.profileId)
        const sightings = await Sighting.find({ owner: user._id })
        res.render('profile', { user, sightings })
    } catch (err) {
        console.log(err)
    }
})




// MAKE A MIDDLEWARE ———————————————————————> IS IT THEIR PROFILE

// LINK THE SIGHTINGS WITH THE USER_ID —————> USER_ID & SIGHTING_ID

// LINK THE COMMENTS THEY DID ——————————————> AUTHOR




module.exports = router;