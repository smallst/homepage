const db = require('../db');

module.exports = db.defineModel('Notification', {
    User: String,
    info: Object,
    read: Boolean,
});