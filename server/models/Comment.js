const db = require('../db');

module.exports = db.defineModel('Comment', {
    type: String,
    userId: String,
    replyId: String,
    content: String,
    fatherId: String,
    rootId: String,
});