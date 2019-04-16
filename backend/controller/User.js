const User = require('../models/User');
const util = require("../util/util");
const auth = require('../util/auth');
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

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

exports.uploadUserImage = async (ctx, next, projectId = "dudetime", bucketName = "fredster_182_dudetime") => {
    const storage = new Storage({projectId});
    const bucket = storage.bucket(bucketName);

    console.log("Wir sind im upload");
    const uploadFile = ctx.request.body.avatar;
    if (uploadFile) {
        const gcsname = Date.now() + uploadFile.name;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: uploadFile.mimetype
            },
            resumable: false
        }).on('error', function (err) {
            console.log(err);
        }).on('finish', async () => {
            console.log("finish");
        });

        await uploadFile.pipe(stream);

        ctx.request.body.avatar.cloudStoragePublicUrl = getPublicUrl(gcsname);
        await next();
        // ctx.body = {picturePath: ctx.request.body.avatar.cloudStoragePublicUrl};
        // stream.end();
        // await next();
    }
};

function getPublicUrl(filename) {
    return `https://storage.googleapis.com/fredster_182_dudetime/${filename}`;
}

exports.geUsers = async (ctx, next) => {
    //todo only query needed fields
    //ctx.params named route parameters
    //ctx.request.query ?
    const users = await User.find({});
    if (!users || users.length === 0) {
        ctx.throw(500, "There was an error retrieving your contacts.");
    } else {
        // console.log(users[0].id);
        // ctx.body = users
    }
    return users;
};

exports.updateUserPicture = async (ctx) => {
    const user = await User.updateOne({id: ctx.session.userId}, {picturePath: ctx.request.body.avatar.cloudStoragePublicUrl});
    ctx.body = {picturePath: ctx.request.body.avatar.cloudStoragePublicUrl};
};

exports.handleUser = async (ctx) => {
    console.log("create User");
    //todo maybe add current location
    if (!ctx.request.body.userName) {
        ctx.request.body.userName = "userName " + util.getRandom(100);
        // ctx.request.body.phoneNumber = "phoneNumber " + util.getRandom(100000);
    }

    let user = null;
    if (ctx.session.userId) {
        user = await User.findById(ctx.session.userId);
    }
    if (ctx.request.body.authId) {
        user = await User.findOne({authId: ctx.request.body.authId});
    }
    if (!user) {
        user = await User.create({
            userName: ctx.request.body.userName,
            picturePath: ctx.request.body.picturePath,
            phoneNumber: ctx.request.body.phoneNumber,
            // contacts: ctx.request.body.contacts,
            authId: ctx.request.body.authId || "dummyAuth",
        });
    }

    if (!user) {
        ctx.throw(500, "Failed to create user");
    } else {
        ctx.body = user;
    }
};
