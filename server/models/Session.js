const db = require('../db');

module.exports = db.defineModel('Session', {
    key: String,
    data: Object,
    updatedAt:{
        default: new Date(),
        expires: 864000000,
        type: Date
    }
});