const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
// Use the cors middleware
app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.bxqfvab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// ==============>Collection: 
db = client.db("crudProject")
const feedbackCollection = db.collection("feedback")

// ===============>CRUD operation:
// Define routes
app.get("/feedback", async (req, res) => {
    const query = {};
    const result = await feedbackCollection.find(query).sort({ _id: -1 }).toArray();
    res.send(result);
});

app.post("/feedback", async (req, res) => {
    const feedbackData = req.body;
    console.log(feedbackData);
    const result = await feedbackCollection.insertOne(feedbackData);
    res.send(result);
});

app.get('/home', (req, res) => {
    res.send('This is home page');
});

app.get("/", async (req, res) => {
    res.send("server is running");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});