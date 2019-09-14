const { join } = require('path');
const { readFileSync } = require('fs');

const connection = require('./connection');

exports.dbBuild = () => {
    const filePath = join(__dirname, 'build.sql');
    const sql = readFileSync(filePath).toString();
    console.log(sql);

    return connection.query(sql);
};