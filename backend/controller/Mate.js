const Mate = require('../models/Mate');
const User = require('./User');
const util = require("../util/util");

exports.getMates = async (ctx) => {
    this.session.value
    //todo only query needed fields
    let mates = await Mate.find({}).populate('owner').populate('participants').exec();
    if (!mates) {
        throw new Error("There was an error retrieving your mates.")
    } else {
        ctx.body = mates
    }
};

exports.createMate = async (ctx) => {
    try {
        ctx.body = ctx.request.body; //todo put this in some middleware
    } catch (e) {
        console.log("not JSON");
    }

    if (!ctx.body.title) {

        let users = await User.getUsers(ctx);

        ctx.body.title = "Some title " + util.getRandom(100);
        ctx.body.tags = ["#someTag" + util.getRandom(100), "#another" + util.getRandom(100), "#Sauuffeeen" + util.getRandom(100)];
        ctx.body.location = "Some location " + util.getRandom(100);
        ctx.body.subLocation = "Alte PartyHalle" + util.getRandom(100);
        ctx.body.time = new Date();
        ctx.body.ownerId = users[0].id;
        ctx.body.receivers = users.slice(1).map((user) => user.id);
        ctx.body.participants = users.slice(1).map((user) => user.id);
    }

    const result = await Mate.create({
        title: ctx.body.title,
        tags: ctx.body.tags,
        location: ctx.body.location,
        subLocation: ctx.body.subLocation,
        time: ctx.body.time,
        status: ctx.body.status,
        owner: ctx.body.ownerId,
        receivers: ctx.body.receivers,
        participants: ctx.body.participants
    });

    if (!result) {
        throw new Error('Mate failed to create.')
    } else {
        ctx.body = {message: 'Mate created!', data: result}
    }
};
