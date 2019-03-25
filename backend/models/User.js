const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, required: true },
    lastName: String,
    firstName: String,
    phoneNumber: { type: String, required: true },
    picture: { data: Buffer, contentType: String }, //change this to image Path and store on S3 or so ... or even store the small avatar images in frontend app store
});

module.exports = mongoose.model("User", UserSchema);
