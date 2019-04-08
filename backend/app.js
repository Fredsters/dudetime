const Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    user = require('./controller/user'),
    mate = require('./controller/mate'),
    db = require('./database').db,
    koaBody = require('koa-body')(),
    session = require('koa-session');


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
    /* centralized error handling:
  *   console.log error
  *   write error to log file
  *   save error and request information to database if ctx.request match condition
  *   ...
 */
});

app.keys = ['Ungeheim', 'Westerhase'];
const CONFIG = {
    maxAge: 86400000 * 365,
    signed: true
};

app.use(session(CONFIG, app));

app.use(async (ctx, next) => {
    // ignore favicon
    if (ctx.path === '/favicon.ico') {
        return;
    }

    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    await next();
    console.log("lalala");
    ctx.body.count = n;
});


router
    .get('/contacts/:id', user.getUserContacts)
    // .get('/users', user.getUsers)
    .post('/users', koaBody, user.createUser)
    .get('/mates', mate.getMates)
    .post('/mates', koaBody, mate.createMate);

app
    .use(router.routes())
    .use(router.allowedMethods());

var server = app.listen(3000);
console.log("Listening on port 3000");

module.exports = server;
