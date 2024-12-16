const { db } = require('../db');

exports.getBaseUrl = async (req) => {
    return req.connection && req.connection.encrypted ? "https" : "http" + `://${req.headers.host}`;
}