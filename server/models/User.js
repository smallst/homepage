const db = require('../db');

module.exports = db.defineModel('User', {
    user: String,
    passwd: String,
    likes: Array
});