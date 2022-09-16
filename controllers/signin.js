const handleSignIn = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json('incorrect form submission');
    } else {
        db.select('email', 'hash').from('login')
        .where('email', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
    }
}

module.exports = {
    handleSignIn
}