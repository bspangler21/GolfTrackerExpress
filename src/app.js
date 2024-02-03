// const express = require('express');
// // import our local router file
// const routes = require('./routes');
// // init express app
// const app = express();
// // allow express to work with json
// app.use(express.json());
// // router
// app.use(routes);
// // export app to import into server.js
// module.exports = app;

// const express = require('express');
// const mongoose = require('mongoose');
import express from 'express';
import mongoose from 'mongoose';
const app = express();
// const { MongoClient, ServerApiVersion } = require('mongodb');
import golferRoute from './Routes/golfer.js';

// const uri = "mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const url = "mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority"; // Replace with your MongoDB connection URL
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

app.use(express.json());

try {
    con.on('open', () => {
        console.log('Connected to the database');
    })
} catch (error) {
    console.log("Error: " + error);
}

// const port = 5000;
// app.listen(port, () => {
//     console.log('Server started on port ' + port);
// });

// const golferrouter= require("./Routes/golfer.js"); // Fix the casing of the file path
app.use('/golfers', golferRoute); // Fix the variable name
// console.log("golferRoute: ", golferRoute);
// console.log("app: ", app.use('/golfers', golferRoute));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

export default app; 
