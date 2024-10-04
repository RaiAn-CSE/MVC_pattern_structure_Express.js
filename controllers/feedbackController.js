const { feedbackCollection } = require('../models/feedbackModel');
const { ObjectId } = require('mongodb');

// Get all feedback:
const getAllFeedback = async (req, res) => {
    const feedback = await feedbackCollection().find({}).sort({ _id: -1 }).toArray();
    res.send(feedback);
};

//post data on home page:
const postFeedback = async (req, res) => {
    const result = await feedbackCollection().insertOne(req.body);
    res.send(result);
};

// Delete Data From Home Page:
// const deleteFeedback = async (req, res) => {
//     const filter = req.params; // Get the feedback ID from the request params
//     const result = await feedbackCollection().deleteOne(filter); // Execute delete query
//     res.send(result);
// };

// Another way for delete operation:
const deleteFeedback = async (req, res) => {
    const id = req.params.id; // Get the feedback ID from the request params
    // console.log(id, "delete ID");
    const filter = { _id: new ObjectId(id) }; // Convert the id to ObjectId
    // console.log(filter, "ObjectId delete ID");
    const result = await feedbackCollection().deleteOne(filter); // Execute delete query
    res.send(result);
};

// Update Feedback (PATCH):
// const updateFeedback = async (req, res) => {
//     const update = await feedbackCollection().updateOne(req.params, { $set: req.body });
//     res.send(update);
// };

// Another way for delete operation: 
const updateFeedback = async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const updateData = req.body;
    const updateDoc = {
        $set: updateData,
    };
    const result = await feedbackCollection().updateOne(filter, updateDoc);
    res.send(result);
};

// Search Query in Feedback field:
const searchFeedback = async (req, res) => {
    // console.log(req.params.key);
    const search = await feedbackCollection().find({
        // need regex 
        "$or": [
            { "lastName": { $regex: req.params.key, $options: "i" } },
            { "firstName": { $regex: req.params.key, $options: "i" } }
        ]
    }).toArray();
    res.send(search);
}

// Export as an object
module.exports = { getAllFeedback, postFeedback, deleteFeedback, updateFeedback, searchFeedback };

