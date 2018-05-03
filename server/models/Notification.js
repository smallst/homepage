const db = require('../db');

module.exports = db.defineModel('Notification', {
    userId: String,
    info: Object,
    read: Boolean,
});