const db = require('../db');

module.exports = db.defineModel('Story', {
    number: Number,
    story: String,
    title: String,
    day: Boolean,
    content: String
});