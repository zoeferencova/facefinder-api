const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const user = require('./controllers/user');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: 'postgres://chbobuojnbgkvb:c81e37bdfbfaf8e8d80021e2bacd4edca1a57ef475564f3b8e1d0340dcc448d8@ec2-34-227-120-79.compute-1.amazonaws.com:5432/d5jtf8iag3dmk8',
        ssl: { rejectUnauthorized: false }
    }
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send(process.env.DATABASE_URL));
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.get('/user/:id', user.handleGetUser(db));
app.post('/image', image.handleImageDetection);

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});
