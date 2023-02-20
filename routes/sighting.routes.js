const express = require('express');
const router = express.Router();
const Sighting = require('../models/Sighting.model')



// RENDER ALL SIGHTINGS PAGE




// RENDER PAGE FOR CREATE A SIGHTING

// —————————————————————————————————————————————————> MAKE A FORM IN THE VIEW FILE WE RENDER



// LISTEN FOR A FORM ON THE CREATE SIGHTING PAGE 

// ————————————————————————————————————————————————> ACCES INFORMATION USER JUST PROVIDE WITH req.body
// ————————————————————————————————————————————————> CREATE THE SIGHTING WIHT      Sighting.create()
// ————————————————————————————————————————————————> REDIRECT TO ALL THE SIGHTINGS





// RENDER A SPECIFIC SIGHTING ———> WITH ID
// —————————————————————————————————————————————————> RENDER THE VIEW WITH  req.params.id
// —————————————————————————————————————————————————> RENDER THE PAGE





module.exports = router;