const Sighting = require('../models/Sighting.model')

async function canEdit(req, res, next) {
    const sightingId = await Sighting.findById(req.params.sightingId)
    if (req.session.currentUser._id === sightingId.owner.valueOf()) {
        next()
    } else {
        console.log('boo');
        res.redirect('/sightings/' + req.params.sightingId)
    }
}
module.exports = canEdit