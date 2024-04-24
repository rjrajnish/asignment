const express = require('express');
const { connect } = require('./config/db');
const cors = require('cors')
const router = require('./router');
const { initializeCounts } = require('./controller');

const app = express();
const PORT = process.env.PORT || 5501;

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    // Connecting the mongodb database at the startup
    await connect();
    // Initializing count data if it doesn't exist in the database.
    await initializeCounts();
});