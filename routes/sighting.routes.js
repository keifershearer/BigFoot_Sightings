const express = require('express');
const router = express.Router();
const Sighting = require('../models/Sighting.model')



// RENDER ALL SIGHTINGS PAGE
router.get('/sightings', async (req, res, next) => {
    try {
        const allSightings = await Sighting.find()
        res.render('sighting/sightings', { allSightings })
    } catch (err) {
        next(err)
    }
})



// RENDER PAGE FOR CREATE A SIGHTING
router.get('/create-sighting', async (req, res, next) => {
    try {
        res.render('sighting/create-sighting')
    } catch (err) {
        next(err)
    }
})


// LISTEN FOR A FORM ON THE CREATE SIGHTING PAGE 
router.post('/create-sighting', async (req, res, next) => {
    try {
        const { location, description, date, owner } = req.body
        const newSighting = await Sighting.create({ location, description, date, owner })
        console.log(newSighting)
        res.redirect('/sightings')
    } catch (err) {
        next(err)
    }
})

// ————————————————————————————————————————————————> ACCES INFORMATION USER JUST PROVIDE WITH req.body
// ————————————————————————————————————————————————> CREATE THE SIGHTING WIHT      Sighting.create()
// ————————————————————————————————————————————————> REDIRECT TO ALL THE SIGHTINGS





// RENDER A SPECIFIC SIGHTING ———> WITH ID
router.get('/:sightingId', async (req, res, next) => {
    try {
        const thisSighting = await Sighting.findById(req.params.sightingId)
        res.render('sighting/sighting-details', { thisSighting })
    } catch (err) {
        next(err)
    }
})
// —————————————————————————————————————————————————> RENDER THE VIEW WITH  req.params.id
// —————————————————————————————————————————————————> RENDER THE PAGE





module.exports = router;