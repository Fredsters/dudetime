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
};


exports.getCurrentUser = async (ctx, next) => {
    //todo only query needed fields
    //ctx.params named route parameters
    //ctx.request.query ?
    const user = await User.findById(ctx.session.userId, 'userName');
    if (!user) {
        ctx.throw(500, "There was an error retrieving your contacts.");
    } else {
        ctx.body = user
    }
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
};

exports.createUser = async (ctx) => {
    //todo maybe add current location
    //todo remove this
    if (!ctx.request.body.userName) {
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
        ctx.throw(500, "Failed to create user");
    } else {
        ctx.body = user;
    }
};
