const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/dev', {
        useNewUrlParser: true
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB")
        console.log(err);
    });
