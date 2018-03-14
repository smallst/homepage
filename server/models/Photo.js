const db = require('../db');

module.exports = db.defineModel('Photo', {
    tag: Array,
    title: String,
    url: String
});