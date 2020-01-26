const MongoClient = require("mongodb").MongoClient;
var express = require("express");
var app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser());
// replace the uri string with your connection string.

// POST method route
app.post("/dna", function(req, res) {
  const uri =
    "mongodb+srv://rushi:rushi@cluster0-h619e.gcp.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true";
  MongoClient.connect(uri, async function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    }
    console.log("Connected...");
    const db = client.db("DNA");

    try {
      await db
        .collection("Food Strength")
        .insertOne({ value: req.body.foodStrength });
      await db
        .collection("Poison Strength")
        .insertOne({ value: req.body.poisonStrength });
      await db
        .collection("Food Perception")
        .insertOne({ value: req.body.foodPerception });
      await db
        .collection("Poison Perception")
        .insertOne({ value: req.body.poisonPerception });
      await db
        .collection("Obstacle Separation")
        .insertOne({ value: req.body.obstacleSeparation });
      await db
        .collection("Separation Force")
        .insertOne({ value: req.body.separationForce });
      await db.collection("Speed").insertOne({ value: req.body.speed });
      await db.collection("Max Force").insertOne({ value: req.body.maxForce });
    } catch (e) {
      console.log(e);
    }

    // perform actions on the collection object
    client.close();
  });
  res.send("POST request to the homepage");
});

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function(req, res) {
  res.send("hello world");
});

// localhost:3003
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log("Now server is up and listening on " + PORT + " ...");
});

// mon = async () => {
//   const uri =
//     "mongodb+srv://rushi:rushi@cluster0-h619e.gcp.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true";
//   await MongoClient.connect(uri, async function(err, client) {
//     if (err) {
//       console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
//     }
//     console.log("Connected...");
//     const db = client.db("DNA");

//     try {
//       await db.collection("Food Strength").insertOne({ value: this.dna[0] });
//       await db.collection("Poison Strength").insertOne({ value: this.dna[1] });
//       await db.collection("Food Perception").insertOne({ value: this.dna[2] });
//       await db
//         .collection("Poison Perception")
//         .insertOne({ value: this.dna[3] });
//       await db
//         .collection("Obstacle Separation")
//         .insertOne({ value: this.dna[4] });
//       await db.collection("Separation Force").insertOne({ value: this.dna[5] });
//       await db.collection("Speed").insertOne({ value: this.dna[6] });
//       await db.collection("Max Force").insertOne({ value: this.dna[7] });
//     } catch (e) {
//       console.log(e);
//     }

//     // perform actions on the collection object
//     client.close();
//   });
// };

// mon();
