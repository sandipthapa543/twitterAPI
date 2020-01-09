const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app= express();


app.listen(8000);

// connect data base
mongoose.connect('mongodb://localhost:27017/twitter',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        () => { console.log('successful database connected'); },
    )

    .catch(() => { console.error('error connecting......'); });


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const usersRoute = require('./routes/usersRoute');
app.use('/users', usersRoute);


module.exports=app;




