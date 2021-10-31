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
      const carsCollection = database.collection('car');
     

    // GET CAR API
    app.get('/car', async(req, res) => {
      const cursor  = carsCollection.find({});
      const cars    = await cursor.toArray();
      res.send(cars);
    });
    // POST CAR API
    app.post('/car', async(req, res) => {
      const car     = req.body;
      const result  = await carsCollection.insertOne(car);
      console.log(`Car Successfully inserted with the _id:${result.insertedId}`);
      res.json(result);
    })
    // FIND SINGLE CAR API
    app.get('/car/:id', async(req, res) => {
      const id    = req.params.id;
      const query = {_id: id};
      const car   =  await carsCollection.findOne(query);
      res.json(car);
    });

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