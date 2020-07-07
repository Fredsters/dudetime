const Mate = require('../models/Mate');
const User = require('../models/User');
const util = require("../util/util");
const notificationService = require("../util/expoPushNotifications");

//get accepted mates where current user is owner or current user is participant

exports.getMates = async (ctx) => {
    //todo only query needed fields
    //read mates where current user is in receivers (also show rejected/accepted)
    const {open, accepted, rejected, own} = ctx.query;
    let mates = await Mate.find({}).populate('owner').populate('participants').exec();
    if (!mates) {
        throw new Error("There was an error retrieving your mates.")
    } else {
        ctx.body = mates
    }
};

exports.createMate = async (ctx) => {
    console.log("create Mate");
    const data = ctx.request.body;
    
    const user = await User.findById(data.owner).populate('contacts', 'expoPushToken').exec();
    const pushNotifications = [];
    pushNotifications.push(user.expoPushToken);
    for(const contact of user.contacts) {
        if(contact.expoPushToken) {
            pushNotifications.push(contact.expoPushToken);
        }
    }
    const title = data.title;
    notificationService.sendPushNotifications(pushNotifications, "You got a new Mate invitation!!", `${user.userName} invites you to ${title}`, {"someTest": "data"});
    const mate = await Mate.create({
        title: title,
        tags: data.tags,
        location: data.location,
        subLocation: data.subLocation,
        time: data.time,
        owner: user,
        receivers: user.contacts
    });

    if (!mate) {
        throw new Error('Failed to create Mate')
    } else {
        ctx.body = mate
    }
};
