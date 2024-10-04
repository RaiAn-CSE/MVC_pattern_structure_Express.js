const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.bxqfvab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

const connectToDB = async () => {
    try {
        await client.connect();
        db = client.db("crudProject");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

const getDB = () => db;

module.exports = { connectToDB, getDB };
