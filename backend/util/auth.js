const consts = require("./consts");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(consts.CLIENT_ID);

exports.verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: consts.CLIENT_ID
    });
    return ticket.getPayload()['sub'];
};

exports.authenticate = async (ctx, next) => {
    //todo store session cookie in db ?
    //todo check how to handle expired session
    const token = ctx.request.body.idToken;
    if (ctx.session.userId || token) {
        if (token) {
            const nodeAuthId = await this.verify(token);
            ctx.request.body.nodeAuthId = nodeAuthId;
        }
        await next();
        if (token) {
            ctx.session.userId = ctx.body.id;
        }
    } else {
        ctx.throw(401, 'No valid session');
    }
};

