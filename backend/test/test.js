var assert = require('assert'),
    mongoose = require('mongoose'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    expect = chai.expect,
    sinon = require("sinon"),
    auth = require("../util/auth"),
    User = require('../models/User');
let app = null;
let userSessionId = null;
chai.use(chaiHttp);

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('User', function () {
    before(async () => {
        await mongoose.connect('mongodb://localhost/test', {
            useNewUrlParser: true
        });


        sinon.stub(auth, 'authenticate')
            .callsFake((ctx, next) => {
                ctx.session = {userId: userSessionId};
                return next();
            });

        app = require("../app");
    });

    after(async () => {
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await mongoose.model("User").collection.drop();
    });

    describe('create', () => {
        it('should create a new user', async () => {

            const res = await chai.request(app).post("/users").send({
                userName: "myName",
                phoneNumber: "awesome number",
                nodeAuthId: "dummy"
            });

            expect(res).to.be.a('object');
            expect(res.body).to.have.property('userName');
            expect(res.body.userName).to.equal('myName');
            expect(res.body.phoneNumber).to.equal('awesome number');
        });
    });

    describe('update', () => {
        it('should change phoneNumber and userName of user', async () => {

            const user = await User.create({
                userName: "oldName",
                phoneNumber: "old number",
                nodeAuthId: "dummyAuth"
            });
            //
            // let cookie = Buffer.from(JSON.stringify({userId: user.id})).toString('base64'); // base64 converted value of cookie
            //
            // let kg = Keygrip(['Ungeheim']); // same key as I'm using in my app
            // let hash = kg.sign('my-session=' + cookie);
            userSessionId = user.id;
            const res = await chai.request(app).patch("/users")
                .send({
                    userName: "myNewName",
                    phoneNumber: "new number"
                });

            expect(res).to.be.a('object');
            expect(res.body).to.have.property('userName');
            expect(res.body.userName).to.equal('myName');
            expect(res.body.phoneNumber).to.equal('awesome number');

        });
    });
});
