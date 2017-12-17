const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const DudeSchema = new Schema({
    lastMate: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Dude", DudeSchema);