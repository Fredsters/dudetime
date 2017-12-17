const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var status_array = ["PAST", "OPEN", "ACCEPTED", "HIDDEN", "HIDDEN_ACCEPTED"];

const MateSchema = new Schema({
	title: String,
	description: String,
	activity: String,
	location: String,
	time: { type: Date, required: true },
	createTime: { type: Date, default: Date.now },
	status: {type: String, uppercase: true, enum: [status_array]},
	owner: { type: ObjectId, ref: 'User' },
	receivers: {type: [ObjectId], required: true},
	participants: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model("Mate", MateSchema);

//when I save a Mate, everybody who may see my mates will have an update in their current mate list