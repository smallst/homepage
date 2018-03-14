const db = require('../db');

module.exports = db.defineModel('Blog', {
    type: String,
    tag:Array,
    title: String,
    content: String,
});