const Profile = require('../models/Profile')

exports.getProfiles = async (ctx) => {
	const profiles = await Profile.find({})
	if (!profiles) {
		throw new Error("There was an error retrieving your profiles.")
	} else {
		ctx.body = profiles
	}
}

exports.createProfile = async (ctx) => {
    console.log(ctx);
	const result = await Profile.create({
		
	})
	if (!result) {
		throw new Error('Profile failed to create.')
	} else {
		ctx.body = {message: 'Profile created!', data: result}
	}
}