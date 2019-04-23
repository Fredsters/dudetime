const Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    user = require('./controller/user'),
    mate = require('./controller/mate'),
    db = require('./database').db,
    koaBody = require('koa-body')({}),
    session = require('koa-session'),
    auth = require('./util/auth');
require('dotenv').config();

//Multy = require('multy'), was used for image piping


app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

app.on('error', (err, ctx) => {
    console.log(err.message);
    console.log(err);
    console.log(ctx);
    /* centralized error handling:
  *   console.log error
  *   write error to log file
  *   save error and request information to database if ctx.request match condition
  *   ...
 */
});

//todo use environment variables
app.keys = ['Ungeheim', 'Westerhase'];
const CONFIG = {
    maxAge: 86400000 * 365
};

app.use(session(CONFIG, app));
app.use(koaBody);

//router.use(Multy()); was used for image piping

app.use(async (ctx, next) => {
    //todo store session cookie in db ?
    //todo check how to handle expired session
    const token = ctx.request.body.idToken;
    if (ctx.session.userId || token) {
        if (token) {
            const nodeAuthId = await auth.verify(token);
            ctx.request.body.nodeAuthId = nodeAuthId;
        }
        await next();
        if (token) {
            ctx.session.userId = ctx.body.id;
        }
    } else {
        ctx.throw(401, 'No valid session');
    }
});

router
    .get('/contacts/:id', user.getUserContacts)
    // .get('/users', user.getUsers)
    .get("/currentUser", user.getCurrentUser)
    .patch('/users/contacts', user.updateUserContacts)
    .post('/users', user.handleNewUser)
    .patch('/users', user.updateUser)
    .patch('/users/profilePicture', user.updateUserPicture)
    .get('/mates', mate.getMates)
    .post('/mates', mate.createMate);

// .post('/userImage', user.uploadUserImage, user.updateUserPicture);

app
    .use(router.routes())
    .use(router.allowedMethods());

const server = app.listen(3000);
console.log("Listening on port 3000");

module.exports = server;
