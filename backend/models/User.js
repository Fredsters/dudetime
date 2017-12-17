const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, required: true },
    lastName: String,
    firstName: String,
    phoneNumber: { type: String, required: true },
    picture: { data: Buffer, contentType: String },
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' }
});

module.exports = mongoose.model("User", UserSchema);