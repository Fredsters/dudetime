const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

const ProfileSchema = new Schema({
    senders: [ObjectId],
    receivers: [ObjectId],
    myMates: [{ type: ObjectId, ref: 'Mate' }],
    openMates: [{ type: ObjectId, ref: 'Mate' }],
    acceptedMates: [{ type: ObjectId, ref: 'Mate' }]
});

module.exports = mongoose.model("Profile", ProfileSchema);