const Sighting = require('../models/Sighting.model')

async function canEdit(req, res, next) {
    if (!req.session.currentUser) {
        return res.redirect('/login')
    }
    const sightingId = await Sighting.findById(req.params.sightingId)
    if (req.session.currentUser._id === sightingId.owner.valueOf()) {
        next()
    } else {
        console.log('boo');
        res.redirect('/sightings/' + req.params.sightingId)
    }
}
module.exports = canEdit