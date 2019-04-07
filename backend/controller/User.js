const User = require('../models/User');
const util = require("../util/util");

exports.getUserContacts = async (ctx, next) => {
    //todo only query needed fields
    //ctx.params named route parameters
    //ctx.request.query ?
    const users = await User.findById(ctx.params.id, 'contacts');
    if (!users || users.length === 0) {
        ctx.throw(500, "There was an error retrieving your contacts.");
    } else {
        ctx.body = users
    }
    return next();
};

exports.getUsers = async (ctx, next) => {
    //todo only query needed fields
    //ctx.params named route parameters
    //ctx.request.query ?
    const users = await User.find({});
    if (!users || users.length === 0) {
        ctx.throw(500, "There was an error retrieving your contacts.");
    } else {
        console.log(users[0].id);
        ctx.body = users
    }
    return users;
};

exports.createUser = async (ctx) => {
    try {
        ctx.body = ctx.request.body; //todo put this in some middleware
    } catch (e) {
        console.log("not JSON");
    }

    console.log("Create A User");
    if (!ctx.body.userName) {
        //todo maybe add current location
        ctx.body.userName = "userName " + util.getRandom(100);
        ctx.body.phoneNumber = "phoneNumber " + util.getRandom(100000);
    }
    const result = await
        User.create({
            userName: ctx.body.userName,
            picturePath: ctx.body.picturePath,
            phoneNumber: ctx.body.phoneNumber,
            contacts: ctx.body.contacts
        });

    if (!result) {
        throw new Error('User failed to create.')
        // ctx.throw(500, "There was an error retrieving your users.");
    } else {
        ctx.body = result
    }
};