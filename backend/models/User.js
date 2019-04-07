const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
    userName: { type: String, required: true },
    picturePath: String,
    phoneNumber: {type: String, required: true},
    contacts: [{type: ObjectId, ref: 'User'}] 
});

module.exports = mongoose.model("User", UserSchema);
