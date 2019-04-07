const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GroupSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model("Group", GroupSchema);
