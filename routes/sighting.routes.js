const express = require('express');
const exposeUsers = require('../middleware/exposeUserToView');
const isLogin = require('../middleware/isLogin');
const router = express.Router();
const Sighting = require('../models/Sighting.model')



// RENDER ALL SIGHTINGS PAGE ———————————————————————————————————————————————————————————————————————————————————
router.get('/sightings', async (req, res, next) => {
    try {

        // DISPLAY ALL THE SIGHTING AND RENDER THE PAGE
        const allSightings = await Sighting.find().populate('owner')

        res.render('sighting/sightings', { allSightings })
    } catch (err) {
        next(err)
    }
})



// RENDER PAGE FOR CREATE A SIGHTING ———————————————————————————————————————————————————————————————————————————
router.get('/sightings/create', async (req, res, next) => {
    try {
        res.render('sighting/create-sighting')
    } catch (err) {
        next(err)
    }
})


// LISTEN FOR A FORM ON THE CREATE SIGHTING PAGE  ——————————————————————————————————————————————————————————————————
router.post('/sightings/create', isLogin, async (req, res, next) => {
    try {
        console.log(req.session);
        // ACCES INFORMATION USER JUST PROVIDE IN THE FORM
        const { location, description, date } = req.body

        // CREATE THE SIGHTING WIHT THE INFORMATION WITH JUST ACCESS
        await Sighting.create({ location, description, date, owner: req.session.currentUser._id })
        res.redirect('/sightings')
    } catch (err) {
        next(err)
    }
})






// RENDER A SPECIFIC SIGHTING WITH THE PROVIDED ID IN THE URL ———————————————————————————————————————————————————
router.get('/sightings/:sightingId', async (req, res, next) => {
    try {
        console.log('in this route');
        // GET THE ID PROVIDED IN THE URL AND FIND THE CORRESPONDING SIGHTING
        const thisSighting = await Sighting.findById(req.params.sightingId)

        res.render('sighting/sighting-details', { thisSighting })
    } catch (err) {
        next(err)
    }
})






module.exports = router;