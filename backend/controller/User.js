const User = require('../models/User');
const fs = require("fs");
const path = require("path");
const util = require("../util/util");

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
    try {
        ctx.body = ctx.request.body; //todo put this in some middleware
    } catch (e) {
        console.log("not JSON");
    }

    if (!ctx.body.phoneNumber) {

        ctx.body.phoneNumber = Math.random().toString().substring(2);
        ctx.body.firstName = "firstName " + util.getRandom(100);
        ctx.body.lastName = "lastName " + util.getRandom(100);
        ctx.body.userName = "userName " + util.getRandom(100);
        // var pic = Math.floor(Math.random() * Math.floor(3));
        // var filePath = path.join(__dirname, '../resources/demo_images/' + pic + '.jpg');
        // ctx.body.picture = {
        //     data: fs.readFileSync(filePath),
        //     contentType: "image/jpg"
        // };

    }
    const result = await
        User.create({
            phoneNumber: ctx.body.phoneNumber,
            firstName: ctx.body.firstName,
            lastName: ctx.body.lastName,
            userName: ctx.body.userName,
            picture: ctx.body.picture
        });
    if (!result) {
        throw new Error('User failed to create.')
    } else {
        ctx.body = {message: 'User created!', data: result}
    }
}
;
