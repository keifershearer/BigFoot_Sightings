const express = require('express');
const router = express.Router();
const Sighting = require('../models/Sighting.model')



// RENDER ALL SIGHTINGS PAGE
router.get('/sightings', async (req, res, next) => {
    try {
        const allSightings = await Sighting.find()
        res.render('sighting/sightings', allSightings)
    } catch (err) {
        next(err)
    }
})



// RENDER PAGE FOR CREATE A SIGHTING
router.get('/create-sighting', async (req, res, next) => {
    try {
        res.render('sighting/sightings')
    } catch (err) {
        next(err)
    }
})


// LISTEN FOR A FORM ON THE CREATE SIGHTING PAGE 
router.post('/create-sighting', async (req, res, next) => {
    try {
        const { location, description, date, owner } = req.body
        const newSighting = await Sighting.create({ location, description, date, owner })
        res.redirect('sighting/sightings', newSighting)
    } catch (error) {
        next(err)
    }
})

// ————————————————————————————————————————————————> ACCES INFORMATION USER JUST PROVIDE WITH req.body
// ————————————————————————————————————————————————> CREATE THE SIGHTING WIHT      Sighting.create()
// ————————————————————————————————————————————————> REDIRECT TO ALL THE SIGHTINGS





// RENDER A SPECIFIC SIGHTING ———> WITH ID
// —————————————————————————————————————————————————> RENDER THE VIEW WITH  req.params.id
// —————————————————————————————————————————————————> RENDER THE PAGE





module.exports = router;