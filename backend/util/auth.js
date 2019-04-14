const consts = require("./consts");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(consts.CLIENT_ID);

exports.verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: consts.CLIENT_ID
  });
  return ticket.getPayload()['sub'];
}

