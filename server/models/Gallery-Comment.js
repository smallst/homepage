const db = require('../db');

module.exports = db.defineModel('Gallery-comment', {
    photoId: String,
    content: String,
    fatherId: String,
});