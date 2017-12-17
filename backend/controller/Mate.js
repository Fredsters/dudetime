const Mate = require('../models/Mate')

exports.getMates = async (ctx) => {
	const mates = await Mate.find({}).populate('owner').populate('participants').exec(function (err, mates) {
		console.log(mates) // Max
	});
	if (!mates) {
		throw new Error("There was an error retrieving your mates.")
	} else {
		ctx.body = mates
	}
}

exports.createMate = async (ctx) => {
	const result = await Mate.create({
		title: ctx.request.body.title,
		description: ctx.request.body.description,
		activity: ctx.request.body.activity,
		location: ctx.request.body.location,
		time: ctx.request.body.time,
		status: ctx.request.body.activity,
		owner: ctx.request.body.ownerId,
		receivers: ctx.request.body.receivers, //maybe use default all receivers of users profile, but not in post but for put or patch
		participants: ctx.request.body.participants
	})

	if (!result) {
		throw new Error('Mate failed to create.')
	} else {
		ctx.body = { message: 'Mate created!', data: result }
	}
}