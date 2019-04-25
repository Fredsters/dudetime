const Mate = require('../models/Mate');
const User = require('./User');
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
    if (!ctx.request.body.title) {

        let user = await User.getCurrentUser(ctx);
        ctx.request.body.title = "Some title " + util.getRandom(100);
        ctx.request.body.tags = ["#someTag" + util.getRandom(100), "#another" + util.getRandom(100), "#Sauuffeeen" + util.getRandom(100)];
        ctx.request.body.location = "Some location " + util.getRandom(100);
        ctx.request.body.subLocation = "Alte PartyHalle" + util.getRandom(100);
        ctx.request.body.time = new Date();
        ctx.request.body.ownerId = user;
        ctx.request.body.receivers = [user];
        // ctx.request.body.participants = users.slice(1).map((user) => user.id);
    }

    const result = await Mate.create({
        title: ctx.request.body.title,
        tags: ctx.request.body.tags,
        location: ctx.request.body.location,
        subLocation: ctx.request.body.subLocation,
        time: ctx.request.body.time,
        status: ctx.request.body.status,
        owner: ctx.request.body.ownerId,
        receivers: ctx.request.body.receivers,
        // participants: ctx.request.body.participants
    });

    if (!result) {
        throw new Error('Mate failed to create.')
    } else {
        ctx.body = {message: 'Mate created!', mate: result}
    }
};
