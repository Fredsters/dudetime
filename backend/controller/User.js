const User = require('../models/User')

exports.getUsers = async (ctx) => {
	const users = await User.find({})
	if (!users) {
		throw new Error("There was an error retrieving your users.")
	} else {
		ctx.body = users
	}
}

exports.createUser = async (ctx) => {
	console.log(ctx);
	const result = await User.create({
		phoneNumber: ctx.request.body.phoneNumber,
		firstName: ctx.request.body.firstName,
		lastName: ctx.request.body.lastName,
		userName: ctx.request.body.userName,
		profile: ctx.request.body.id
	})
	if (!result) {
		throw new Error('User failed to create.')
	} else {
		ctx.body = { message: 'User created!', data: result }
	}
}