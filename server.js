const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const user = require('./controllers/user');
const image = require('./controllers/image');

// const db = knex({
//     client: 'pg',
//     connection: {
//         connectionString: process.env.DATABASE_URL,
//         ssl: { rejectUnauthorized: false }
//     }
// });


const parse = require("pg-connection-string").parse;

// Parse the environment variable into an object containing User, Password, Host, Port etc at separate key-value pairs
const pgconfig = parse(process.env.DATABASE_URL);

// Add SSL setting to default environment variable on a new key-value pair (the value itself is an object)
pgconfig.ssl = { rejectUnauthorized: false };

const db = knex({
  client: "pg",
  connection: pgconfig,
});

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
