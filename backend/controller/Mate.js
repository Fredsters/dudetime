const Mate = require('../models/Mate').model;
const User = require('./User');

exports.getMates = async (ctx) => {
    const mates = await Mate.find({}).populate('owner').populate('participants').exec(function (err, mates) {
        console.log(mates) // Max
    });
    if (!mates) {
        throw new Error("There was an error retrieving your mates.")
    } else {
        ctx.body = mates
    }
};

exports.createMate = async (ctx) => {
    try {
        ctx.body = JSON.parse(ctx.request.body); //todo put this in some middleware
    } catch (e) {
        console.log("not JSON");
    }

    if (!ctx.body.title) {

        let users = await User.getUsers(ctx);

        ctx.body.title = "Some title " + Math.random();
        ctx.body.description = "Some description " + Math.random();
        ctx.body.activity = "Some activity " + Math.random();
        ctx.body.location = "Some location " + Math.random();
        ctx.body.time = new Date();
        ctx.body.ownerId = users[0].id;
        ctx.body.receivers = users.slice(1).map((user) => user.id);
    }

    const result = await Mate.create({
        title: ctx.body.title,
        description: ctx.body.description,
        activity: ctx.body.activity,
        location: ctx.body.location,
        time: ctx.body.time,
        status: ctx.body.status,
        owner: ctx.body.ownerId,
        receivers: ctx.body.receivers, //maybe use default all receivers of users profile, but not in post but for put or patch
        participants: ctx.body.participants
    });

    if (!result) {
        throw new Error('Mate failed to create.')
    } else {
        ctx.body = {message: 'Mate created!', data: result}
    }
};
