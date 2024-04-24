const Note = require('./models/note')
const Count = require('./models/count');

/**
 * @description Add the data to the database
 * @method POST
 * @param {title, content}
 */
const add = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'title and content are required' });
        }

        const response = await Note.create(req.body);
        await incrementAddCount();

        return res.status(201).json({ message: 'Data added successfully', data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * @description Update the data to the database
 * @method PUT
 * @param {title | content}
 */
const update = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        if (!title || !content) {
            return res.status(400).json({ error: 'title and content are required' });
        }

        const response = await Note.findByIdAndUpdate(id, req.body, { new: true });
        await incrementUpdateCount();

        return res.status(200).json({ message: 'Data updated successfully', data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * 
 */
const getAll = async (req, res) => {
    try {
        const response = await Note.find();

        return res.status(200).json({ message: 'Data updated successfully', data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

/**
 * @description Initializing the count collection at the startup of the application if doesn't exist.
 */
async function initializeCounts() {
    const existingCount = await Count.findOne();

    if (!existingCount) {
        await Count.create({
            addCount: 0,
            updateCount: 0
        });
    }
}

/**
 * @description Increase the add count upon calling add api by 1.
 */
async function incrementAddCount() {
    await Count.findOneAndUpdate({}, { $inc: { 'addCount': 1 } });
}

/**
 * @description Increase the update count upon calling add api by 1.
 */
async function incrementUpdateCount() {
    await Count.findOneAndUpdate({}, { $inc: { 'updateCount': 1 } });
}

/**
 * @method GET 
 * @description Get Count of api
 */
const getCount = async (req, res) => {
    try {
        const response = await Count.findOne();
        if (!response) {
            return res.status(400).json({ message: "count has not been initialized! Please restart the server" })
        }
        return res.status(200).json({ message: 'Data Fetched successfully', data: response })

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    add,
    update,
    getAll,
    getCount,
    initializeCounts
}