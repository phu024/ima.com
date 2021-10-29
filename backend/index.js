const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();


const url = 'mongodb://localhost:27017/Art';
const config = {
    autoIndex: true,
    useNewUrlparser: true,
    useUnifiedTopology: true
};

expressApp.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Option,Authorization')
    return next()
});

expressApp.use(expressFunction.json());
expressApp.use((req, res, next) => {
    mongoose.connect(url, config)
        .then(() => {
            console.log('Connected to MongoBD...');
            next();
        })
        .catch(err => {
            console.log('Cannot connect to MongoDB');
            res.status(501).send('Connot connect to MongoDB')
        });
});

expressApp.use('/reg', require('./routes/signup'))
expressApp.use('/login', require('./routes/signin'))
expressApp.use('/images', require('./routes/images'))

expressApp.listen(3000, function() {
    console.log('Listening on port 3000');
})