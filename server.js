const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const user = require('./controllers/user');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED=0;

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

// db.raw('select 1+1 as result').then(function () {
//     console.log('hi')
//   });

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('success'));
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/user/:id', user.handleGetUser(db));
app.post('/image', image.handleImageDetection);

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});
