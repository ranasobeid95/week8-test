// Write a query to get the user and their password from the database
const dbConnection = require('../config/connection');

const getUser = (data) => {
    const { email } = data;
    return dbConnection.query(
        {
            text: 'SELECT id,email,password from users where users.email =$1',
            values: [email],
        }
    );
}
module.exports = {
    getUser,
}
