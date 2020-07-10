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
    const data = ctx.request.body;

    const contactIds = await mapContactsToUsers(data.contacts);
    let user = await User.findOne({phoneNumber: data.phoneNumber});
    if(user) {
        user = await User.findOneAndUpdate({_id: user.id}, {picturePath: data.picturePath, contacts: contactIds, userName: data.userName, expoPushToken: data.expoPushToken}, {
            new: true,
            useFindAndModify: false
        });
        ctx.body = user;
        ctx.session.userId = user.id;
        return;
    }

    user = await User.create({
        userName: data.userName,
        picturePath: data.picturePath,
        phoneNumber: data.phoneNumber,
        contacts: contactIds,
        expoPushToken: data.expoPushToken
        // nodeAuthId: data.nodeAuthId,
    });

    if (!user) {
        ctx.throw(500, "Failed to create user");
    } else {
        ctx.status = 200;
        ctx.session.userId = user.id;
        ctx.body = user;
    }
};

exports.updateUser = async (ctx) => {

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


