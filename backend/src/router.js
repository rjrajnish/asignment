const express = require('express');
const { add, update, getCount, getAll } = require('./controller');
const router = express.Router();

/** 
 * @method GET
 * @description Check the status of server is live or not
 */
router.get('/status', (req, res) => {
    res.send("Server is live");
})

/**
 * @method GET
 * @description Fetch all the notes from the database
 */
router.get('/get', getAll)

/**
 * @method POST
 * @description Create a new data in the Note database with title and content.
 */
router.post('/add', add);

/**
 * @method PUT
 * @description Update the existing data with the given id.
 */
router.put('/update/:id', update);

/**
 * @method GET
 * @description Get the count for the api
 */
router.get('/counts', getCount)

module.exports = router;