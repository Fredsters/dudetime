const Koa = require('koa'),
    Router = require('koa-router'),
    user = require('./controller/user'),
    mate = require('./controller/mate'),
    app = new Koa(),
    router = new Router(),
    db = require('./database').db,
    koaBody = require('koa-body')();


app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500
        ctx.body = err.message
        ctx.app.emit('error', err, ctx)
    }
});

router
    .get('/saysomething', async (ctx) => {
        ctx.body = 'Hello Fred';
    })
    .get('/throwerror', async (ctx) => {
        throw new Error('Aghh! An error!')
    })
    .get('/users', user.getUsers)
    .post('/users', koaBody, user.createUser)
    .get('/mates', mate.getMates)
    .post('/mates', koaBody, mate.createMate);

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log("Listening on port 3000");
