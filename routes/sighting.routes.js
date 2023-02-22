const express = require('express');
const exposeUsers = require('../middleware/exposeUserToView');
const isLogin = require('../middleware/isLogin');
const router = express.Router();
const Sighting = require('../models/Sighting.model')
const Comment = require('../models/Comment.model');
const User = require('../models/User.model');
const canEdit = require('../middleware/edit');



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
        // console.log(req.session);
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
        // GET THE ID PROVIDED IN THE URL AND FIND THE CORRESPONDING SIGHTING
        let isOwner = false;
        const thisSighting = await Sighting.findById(req.params.sightingId)
        if (req.session.currentUser._id === thisSighting.owner.valueOf()) {
            isOwner = true
        }
        const comments = await Comment.find({ sighting: req.params.sightingId }).populate('author')

        res.render('sighting/sighting-details', { thisSighting, comments, isOwner })
    } catch (err) {
        next(err)
    }
})


// CREATE THE ROUTE FOR DISPLAYING THE UPDATE FILE TO USER
router.get('/sightings/update/:sightingId', canEdit, async (req, res, next) => {
    try {
        const thisSighting = await Sighting.findById(req.params.sightingId)
        const id = thisSighting._id.valueOf()
        const location = thisSighting.location
        const description = thisSighting.description
        const date = thisSighting.date


        // find corresponding sighting
        res.render('sighting/update-sighting', { location, description, date, id })
    } catch (err) {
        next(err)
    }
})


// UPDATE WITH PATCH METHOD _______________________________________________________________________________________
router.post('/sightings/update/:sightingId', async (req, res, next) => {

    //const oldSighting = req.params
    const id = req.params.sightingId
    const editedSighting = { ...req.body }

    console.log({ id });
    console.log(editedSighting);


    try {
        await Sighting.findByIdAndUpdate(id, editedSighting, { new: true })
        res.redirect('/sightings')

    } catch (error) {
        next(error)
    }
})

//DELETE 
router.post('/sightings/delete/:sightingId', canEdit, async (req, res, next) => {
    try {
        await Sighting.findByIdAndDelete(req.params.sightingId)
        res.redirect('/sightings')

    } catch (err) {
        next(err)
    }
})

module.exports = router;