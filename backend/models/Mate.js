const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

const MateSchema = new Schema({
    title: {type: String, required: true},
    tags: [String],
    location: String,
    subLocation: String,
    time: {type: Date, required: true},
    createTime: {type: Date, default: Date.now},
    owner: {type: ObjectId, ref: 'User'},
    participants: [{type: ObjectId, ref: 'User'}],
    receivers: {type: [ObjectId], required: true, ref: 'User'},
    acceptedBy: {type: [ObjectId], required: true, ref: 'User'},
    rejectedBy: {type: [ObjectId], required: true, ref: 'User'},
});

module.exports = mongoose.model("Mate", MateSchema);