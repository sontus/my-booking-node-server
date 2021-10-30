const express           = require('express');
const { MongoClient }   = require('mongodb');
const cors              = require('cors')
const ObjectId          = require('mongodb').ObjectId;
require('dotenv').config()
const app               = express();
const port              =  process.env.Port|5000;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jewqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      console.log('Database Connected!');
      const database = client.db("myBooking");
      const carsCollection = database.collection("Cars");
     

    } finally {
        //   await client.close();
        }
      }
    run().catch(console.dir);
    



app.get('/' , (req, res) => {
    res.send('Server Successfully Running');
});



app.listen(port, () => {
    console.log('Server Running on port',port)
})