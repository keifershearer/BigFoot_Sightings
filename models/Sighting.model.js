const { Schema, model } = require("mongoose");

const sightingSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sighting_picture_url: String,
},
    {
        timestamps: true
    });

const Sighting = model("Sighting", sightingSchema);
module.exports = Sighting
