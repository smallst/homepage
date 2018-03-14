const db = require('../db');

module.exports = db.defineModel('Story-comment', {
    numberId: String,
    content: String,
    fatherId: String,
});