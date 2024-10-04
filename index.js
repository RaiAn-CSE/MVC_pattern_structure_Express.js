// Without MVC Pattern :
const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Use the cors middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.bxqfvab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with options
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Set up your collections
        const db = client.db("crudProject");
        const feedbackCollection = db.collection("feedback");

        // ===============================>Routes:

        // Get all feedback
        app.get("/feedback", async (req, res) => {
            try {
                const feedback = await feedbackCollection.find({}).sort({ _id: -1 }).toArray();
                res.send(feedback);
            } catch (error) {
                res.status(500).send("Error retrieving feedback");
            }
        });

        // Post Data From Feedback Page:
        app.post("/feedback", async (req, res) => {
            try {
                const result = await feedbackCollection.insertOne(req.body);
                res.send(result);
            } catch (error) {
                res.status(500).send("Error adding feedback");
            }
        });

        // Delete Data From Home Page:
        app.delete("/feedback/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            try {
                const deleteData = await feedbackCollection.deleteOne(query);
                res.send(deleteData);
            } catch (error) {
                res.status(500).send("Error deleting feedback");
            }
        });

        // Update Feedback (PATCH)
        app.patch('/feedback/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateData = req.body;
            const updateDoc = {
                $set: updateData,
            };
            try {
                const result = await feedbackCollection.updateOne(filter, updateDoc);
                res.send(result);
            } catch (error) {
                res.status(500).send("Error updating feedback");
            }
        });

    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

// Call the run function to connect to MongoDB
run().catch(console.dir);

// Default route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
