const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var status_array = ["PAST", "OPEN", "ACCEPTED", "HIDDEN", "HIDDEN_ACCEPTED"];

const MateSchema = new Schema({
    title: String,
    tags: [String],
    location: String,
    subLocation: String,
    time: {type: Date, required: true},
    createTime: {type: Date, default: Date.now},
    status: {type: String, uppercase: true, enum: [status_array]},
    owner: {type: ObjectId, ref: 'User'},
    receivers: {type: [ObjectId], required: true, ref: 'User'},
    participants: [{type: ObjectId, ref: 'User'}]
});

module.exports = mongoose.model("Mate", MateSchema);

//when I save a Mate, everybody who may see my mates will have an update in their current mate list
