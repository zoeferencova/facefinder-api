const handleRegister = (db, bcrypt) => (req, res) => {
    const {  email, name, password } = req.body;
    if (!email || !name || !password) {
        res.status(400).json('incorrect form submission');
    } else {
        const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({ hash, email })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning("*")
                        .insert({ 
                            email: loginEmail[0].email, 
                            name, 
                            joined: new Date() 
                        })
                        .then(user => {
                            res.json(user[0]);
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(err => res.status(400).json(err));
    }
    
}

module.exports = {
    handleRegister
}