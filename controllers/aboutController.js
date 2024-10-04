const { feedbackCollection } = require('../models/feedbackModel')

const getAboutData = async (req, res) => {
    const result = await feedbackCollection().find({}).toArray();
    // console.log(result);
    res.send(result);
}

module.exports = { getAboutData };