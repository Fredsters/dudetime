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
    console.log("Create A User");
    if (!ctx.request.body.userName) {
        //todo maybe add current location
        ctx.request.body.userName = "userName " + util.getRandom(100);
        ctx.request.body.phoneNumber = "phoneNumber " + util.getRandom(100000);
    }
    const user = await
        User.create({
            userName: ctx.request.body.userName,
            picturePath: ctx.request.body.picturePath,
            phoneNumber: ctx.request.body.phoneNumber,
            contacts: ctx.request.body.contacts
        });

    if (!user) {
        throw new Error('User failed to create.')
        // ctx.throw(500, "There was an error retrieving your users.");
    } else {
        console.log(user.id);
        // ctx.cookies.set("userId", user.id, {signed: false});
        // ctx.session.userId = result.id;
        // ctx.session.set()
        // ctx.session.userId = user.id;
        ctx.body = user;
    }
};
