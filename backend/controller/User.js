const User = require('../models/User');

exports.getUsers = async (ctx) => {
    const users = await User.find({});
    if (!users) {
        throw new Error("There was an error retrieving your users.")
    } else {
        ctx.body = users
    }
    return users;
};

exports.createUser = async (ctx) => {
    console.log("Hallo Bert");
    console.log(ctx);
    try {
        ctx.body = JSON.parse(ctx.request.body); //todo put this in some middleware
    } catch (e) {
        console.log("not JSON");
    }

    if (!ctx.body.phoneNumber) {
        ctx.body.phoneNumber = Math.random().toString().substring(2);
        ctx.body.firstName = "firstName " + Math.random().toString().substring(2);
        ctx.body.lastName = "lastName " + Math.random().toString().substring(2);
        ctx.body.userName = "userName " + Math.random().toString().substring(2);
    }
    const result = await
        User.create({
            phoneNumber: ctx.body.phoneNumber,
            firstName: ctx.body.firstName,
            lastName: ctx.body.lastName,
            userName: ctx.body.userName,
            profile: ctx.body.id
        });
    if (!result) {
        throw new Error('User failed to create.')
    } else {
        ctx.body = {message: 'User created!', data: result}
    }
}
;
