const mongoose = require('mongoose');
const { MONGODB_URL } = require('./server.config');

const uri = MONGODB_URL
// Replace <username>, <password>, <cluster>, and <database> with your actual MongoDB Atlas credentials and settings

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB at", uri);
    } catch (error) {
        console.log("Failed to connect to DB", error);
    }
}

module.exports = { connect };
