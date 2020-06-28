const User = require('../models/User');
const util = require("../util/util");
const auth = require('../util/auth');
const fs = require('fs');
const path = require('path');
const consts = require("../util/consts");

exports.getUserContacts = async (ctx) => {
    console.log("getUserContacts: " + ctx.session.userId);
    const users = await User.findById(ctx.session.userId, 'contacts').populate('contacts').exec();;
    if (!users || users.length === 0) {
        ctx.throw(500, "There was an error retrieving your contacts.");
    } else {
        ctx.body = users
    }
};

exports.getUsers = async (ctx) => {
    const users = await User.find({});
    if (!users || users.length === 0) {
        ctx.throw(500, "There was an error retrieving the users.");
    } else {
        ctx.body = users
    }
};

exports.getCurrentUser = async (ctx, next) => {
    //todo only query needed fields
    //ctx.params named route parameters
    //ctx.request.query ?
    //const user = await User.findById(ctx.session.userId);
    console.log("getCurrentUser");
    const user = (await User.find({}).exec())[0];
    if (!user) {
        ctx.throw(500, "There was an error retrieving your contacts.");
    } else {
        ctx.body = user
    }

    return user;
};

//deprecated ^^
// exports.uploadUserImage = async (ctx, next, projectId = "dudetime", bucketName = "fredster_182_dudetime") => {
//     const storage = new Storage({ projectId });
//     const bucket = storage.bucket(bucketName);
//
//     console.log("Wir sind im upload");
//     const uploadFile = ctx.request.body.avatar;
//     if (uploadFile) {
//         const gcsname = Date.now() + uploadFile.name;
//         const file = bucket.file(gcsname);
//
//         const stream = file.createWriteStream({
//             metadata: {
//                 contentType: uploadFile.mimetype
//             },
//             resumable: false
//         }).on('error', function (err) {
//             console.log(err);
//         }).on('finish', async () => {
//             console.log("finish");
//         });
//
//         await uploadFile.pipe(stream);
//
//         ctx.request.body.avatar.cloudStoragePublicUrl = getPublicUrl(gcsname);
//         await next();
//         // ctx.body = {picturePath: ctx.request.body.avatar.cloudStoragePublicUrl};
//         // stream.end();
//         // await next();
//     }
// };

//deprecated
// function getPublicUrl(filename) {
//     return `https://storage.googleapis.com/fredster_182_dudetime/${filename}`;
// }

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
    console.log("update UserPicture");
    //todo throw error when unsuccessful
    const user = await User.findOneAndUpdate({_id: ctx.session.userId}, {picturePath: ctx.request.body.picturePath}, {
        new: true,
        fields: ["picturePath"],
        useFindAndModify: false
    });
    ctx.body = user;
};

exports.onNewUserSave = async (ctx) => {
    console.log("create User");

    const contactIds = await mapContactsToUsers(ctx.request.body.contacts);
    let user = await User.findOne({phoneNumber: ctx.request.body.phoneNumber});
    if(user) {
        user = await User.findOneAndUpdate({_id: user.id}, {picturePath: ctx.request.body.picturePath, contacts: contactIds, userName: ctx.request.body.userName}, {
            new: true,
            useFindAndModify: false
        });
        ctx.body = user;
        return;
    }

    user = await User.create({
        userName: ctx.request.body.userName,
        picturePath: ctx.request.body.picturePath,
        phoneNumber: ctx.request.body.phoneNumber,
        contacts: contactIds,
        // nodeAuthId: ctx.request.body.nodeAuthId,
    });

    if (!user) {
        ctx.throw(500, "Failed to create user");
    } else {
        ctx.body = user;
    }
};

exports.updateUser = async (ctx) => {
    console.log("update User");
    const users = await User.find({});
    const user = await User.findOneAndUpdate({_id: ctx.session.userId},
        {
            userName: ctx.request.body.userName,
            phoneNumber: ctx.request.body.phoneNumber
        }, {
            new: true,
            fields: ["userName", "phoneNumber"],
            useFindAndModify: false
        });

    if (!user) {
        ctx.throw(500, "Failed to update user");
    } else {
        ctx.body = user;
    }
};


exports.updateUserContacts = async (ctx) => {
    const contactIds = await mapContactsToUsers(ctx.request.body.contacts);
    const user = await User.findOneAndUpdate({_id: ctx.session.userId}, {contacts: contactIds}, {
        fields: ["contacts"]
    }).populate('contacts').exec();
    ctx.body = user;
};


const mapContactsToUsers = async (phoneNumbers) => {
    phoneNumbers.forEach((entry) => {
        entry.number = entry.number.replace(/^0/, "+" + consts.country_codes[entry.countryCode.toUpperCase()])
    });

    return await User.find({phoneNumber: {$in: phoneNumbers.map(entry => entry.number)}}, "id");
};


