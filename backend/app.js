const Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    user = require('./controller/user'),
    mate = require('./controller/mate'),
    db = require('./database').db,
    koaBody = require('koa-body')();

//todo need auth

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
