const express = require("express")
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require('mongodb');
// middleware 
app.use(cors())
app.use(express.json())

// connected to the database 

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.p11nzlu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const Best_Eco_Products = client.db('Best_Eco_Products').collection("products")
        app.get("/alldata", async(req, res) =>{
            const result = await Best_Eco_Products.find({}).toArray()
            res.send(result)
        })
    }

    finally{

    }
}
run().catch(err => console.log(err))


// start simple express server 
app.get("/", (req,res) =>{
    res.send("Hello, best eco server is running...")
})

app.listen(port, () =>{
    console.log('server is running from port, ',port)
})