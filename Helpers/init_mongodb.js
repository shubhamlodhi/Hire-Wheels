const mongoose = require('mongoose');
const { MONGODB_URI, DB_NAME, USER, PASS } = require('../config/keys');



//mongoose.connect(MONGOURI,
mongoose.connect(MONGODB_URI,
    {
        dbName: DB_NAME,
        user: USER,
        pass: PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,

    }).then(() => {
        console.log('mongodb connected.')
    }).catch(err => console.log(err.message))

mongoose.connection.on('connected', () => {
    console.log('mongoose connected to db');
})

mongoose.connection.on('error', (err) => {
    console.log(err.message);
})

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected to db');
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})