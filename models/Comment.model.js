

const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sighting: {
        type: Schema.Types.ObjectId,
        ref: 'Sighting',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 300
    },
},
    {
        timestamps: true
    }
)
const Comment = model("Comment", commentSchema);
module.exports = Comment