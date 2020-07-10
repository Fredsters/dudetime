const mongoose = require('mongoose');
const mongooseLeanId = require('mongoose-lean-id');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

const MateSchema = new Schema({
    title: {type: String, required: true},
    tags: [String],
    location: String,
    subLocation: String,
    time: {type: Date, required: true},
    createTime: {type: Date, default: Date.now},
    owner: {type: ObjectId, required: true, ref: 'User'},
    receivers: [{type: ObjectId, required: true, ref: 'User'}],
    acceptedBy: [{type: ObjectId, ref: 'User'}],
    rejectedBy: [{type: ObjectId, ref: 'User'}],
});

MateSchema.plugin(mongooseLeanId);

module.exports = mongoose.model("Mate", MateSchema);