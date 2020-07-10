const Mate = require('../models/Mate');
const User = require('../models/User');
const util = require("../util/util");
const {MateStatus} = require ("../util/consts");
const notificationService = require("../util/expoPushNotifications");

exports.getMates = async (ctx) => {
    //todo only query needed fields
    //todo use client/user date time
    const {open, accepted, rejected, own} = util.parseBooleanParameters(ctx.query);
    const userId = ctx.session.userId;
    const whereObject = {receivers: {$in: [userId]}, time: {$gte: new Date()}};

    if(accepted && own && rejected) {
        whereObject["$or"] = [{ acceptedBy: {$in: [userId]}}, { rejectedBy: {$in: [userId]}}, { owner: {$eq: userId}}];
    } 
    if(open) {
        whereObject["$and"] = [{acceptedBy: {$nin: [userId]}}, {rejectedBy: {$nin: [userId]}}, {owner: {$ne: userId}}];
    }

    const mates = await Mate.find(whereObject).sort('time').populate({path: 'owner', select: 'userName picturePath'}).populate({path: 'acceptedBy', select: 'userName picturePath'}).lean().exec();

    for (const mate of mates) {
        if(open) {
            mate.status = MateStatus.Open;
        } else {
            if(mate.owner.id === userId || mate.acceptedBy.some(user => user.id === userId)) {
                mate.status = MateStatus.Accepted;
            } else {
                mate.status = MateStatus.Rejected;
            }
        }   
    }

    if (!mates) {
        throw new Error("There was an error retrieving your mates.")
    } else {
        ctx.status = 200;
        ctx.body = mates
    }
};

exports.createMate = async (ctx) => {
    console.log("create Mate");
    const data = ctx.request.body;
    
    //Todo add new mate via push notification?
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
    //todo load this new created mate for all and mix it in the right place in the app
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
        ctx.status = 201;
        ctx.body = mate
    }
};

exports.acceptMate = async (ctx) => {
    const data = ctx.request.body;
    const userId = ctx.session.userId;

    //todo if owner is user it can't be rejected

    //todo push notifications (invisible) to all that see this mate, then reload for all of them this particular mate
    //visible push notification to owner of mate
    let updateObject;
    if(data.status === MateStatus.Rejected) {
        updateObject = {$push: {rejectedBy: userId}, $pull: {acceptedBy: userId}};
    }
    if(data.status === MateStatus.Accepted) {
        updateObject = {$push: {acceptedBy: userId}, $pull: {rejectedBy: userId}};
    }
    const mate = await Mate.findOneAndUpdate({_id: data.id}, updateObject, {useFindAndModify: false, new: true}).populate({path: 'owner', select: 'userName picturePath'}).populate({path: 'acceptedBy', select: 'userName picturePath'}).lean().exec();    
    
    mate.status = data.status;
    
    if (!mate) {
        throw new Error('Failed to update Mate')
    } else {
        ctx.status = 200;
        ctx.body = mate
    }
};