const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    userSightings: [{
      type: Schema.Types.ObjectId,
      ref: 'Sighting'
    }]
  },
  {

    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
