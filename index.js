const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors());

// MongoDB connection
const uri = "mongodb+srv://baby-toy-store:vLKa55eIwcY1RgYT@cluster0.eehyjj4.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const babyProductsCollection = client.db("babyProductDB").collection("babyProduct");
        const cartProductsCollection = client.db("babyProductDB").collection("cartProduct");

        // POST method for adding baby products
        app.post("/v1/babyProduct", async (req, res) => {
            try {
                const product = req.body;
                const result = await babyProductsCollection.insertOne(product);
                console.log(result);
                res.status(201).send(result);
            } catch (error) {
                console.error("Error adding product:", error);
                res.status(500).send("Error adding product");
            }
        });
        // 2nd post data 
        app.post("/v1/addtocart", async (req, res) => {
            try {
                const product = req.body;
                const result = await cartProductsCollection.insertOne(product);
                console.log(result);
                res.status(201).send(result);
            } catch (error) {
                console.error("Error adding product:", error);
                res.status(500).send("Error adding product");
            }
        });
        // get data api 
        app.get("/v1/babyProducts", async (req, res) => {
            try {
                const result = await babyProductsCollection.find().toArray();
                console.log(result);
                res.send(result);
            } catch (error) {
                console.error('Error in /v1/paymentCard route:', error);
                res.status(500).send('Internal Server Error');
            }
        });
        // 2nd get data in here
        app.get("/v1/cartProducts", async (req, res) => {
            try {
                const result = await cartProductsCollection.find().toArray();
                console.log(result);
                res.send(result);
            } catch (error) {
                console.error('Error in /v1/paymentCard route:', error);
                res.status(500).send('Internal Server Error');
            }
        });
// delete 



        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

run();

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port:${port}`);
});
