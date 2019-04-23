var assert = require('assert'),
    mongoose = require('mongoose'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    user = require('../controller/user'),
    app = require("../app");

chai.use(chaiHttp);
var request = chai.request(app);
var expect = chai.expect;


describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('User', function () {
    before(async () => {
        const db = await mongoose
            .connect('mongodb://localhost/test', {
                useNewUrlParser: true
            });
        // .then((response) => {
        //     console.log('mongo connection created')
        // })
        // .catch((err) => {
        //     console.log("Error connecting to Mongo")
        //     console.log(err);
        // });
    });

    describe("createUser", function () {
        it("should create a user with correct name", async (done) => {
            request.post("/users").send({
                'userName': 'The_Awesome_one',
                "phoneNumber": "Some damn awesome number",
                'picturePath': '/a/path/to/the/awesome/pic'
            }).end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.userName).to.equal("The_Awesome_one");
                expect(res.body.picturePath).to.equal("/a/path/to/the/awesome/pic");
                expect(res.body.phoneNumber).to.equal("Some damn awesome number");
                done();
            });
        });
    });

    describe("updateUser", function () {
        it("should update a user with correct name", async (done) => {
            request.post("/users").send({
                'userName': 'The_Awesome_one',
                "phoneNumber": "Some damn awesome number",
                'picturePath': '/a/path/to/the/awesome/pic'
            }).end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.userName).to.equal("The_Awesome_one");
                expect(res.body.picturePath).to.equal("/a/path/to/the/awesome/pic");
                expect(res.body.phoneNumber).to.equal("Some damn awesome number");
                done();
            });
        })
    })

});