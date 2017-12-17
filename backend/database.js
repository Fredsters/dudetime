const mongoose = require('mongoose');

mongoose.Promise = require('bluebird')
mongoose
    .connect('mongodb://localhost/testDB', {
        useMongoClient: true
    })
    .then((response) => {
	    console.log('mongo connection created')
    })
    .catch((err) => {
        console.log("Error connecting to Mongo")
        console.log(err);
    })