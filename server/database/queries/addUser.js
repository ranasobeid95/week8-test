// Write a query to add the user and their password to the database
const dbconnection = require('../config/connection');

exports.addUser = (data) => {
    const {email,hash} = data
    return dbconnection.query({
        text: 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *;',
        values: [email, hash],

    });
}

