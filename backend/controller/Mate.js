const Mate = require('../models/Mate');
const User = require('../models/User');
const util = require("../util/util");

exports.getMates = async (ctx) => {
    //todo only query needed fields
    let mates = await Mate.find({}).populate('owner').populate('participants').exec();
    if (!mates) {
        throw new Error("There was an error retrieving your mates.")
    } else {
        ctx.body = mates
    }
};

exports.createMate = async (ctx) => {
    console.log("create Mate");
    //todo create push notification for all receivers
    const user = await User.findById(ctx.request.body.owner);

    const mate = await Mate.create({
        title: ctx.request.body.title,
        tags: ctx.request.body.tags,
        location: ctx.request.body.location,
        subLocation: ctx.request.body.subLocation,
        time: ctx.request.body.time,
        owner: user,
        receivers: user.contacts
    });

    if (!mate) {
        throw new Error('Failed to create Mate')
    } else {
        ctx.body = mate
    }
};
