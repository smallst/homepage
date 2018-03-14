const db = require('../db');

module.exports = db.defineModel('Blog-comment', {
    blogId: String,
    content: String,
    fatherId: String,
});