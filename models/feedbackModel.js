const { getDB } = require('../config/db')

//Get the feedback collection:
const feedbackCollection = () => {
    return getDB().collection("feedback");
}

module.exports = { feedbackCollection };