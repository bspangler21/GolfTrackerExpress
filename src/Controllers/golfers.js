import golferData from '../Model/golferData.js';
import { MongoClient } from 'mongodb';

const client = await MongoClient.connect(
  'mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const getGolfers = async (req, res) => {
    // try {
    //     const golfers = await client.db('golf-tracker').collection('golfers');
    //     res.status(200).json(golfers);
    // } catch (error) {
    //     res.status(404).json({ message: error.message });
    // }
    try {
        const golfers = await golferData.find();
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};

console.log("getGolfers: ", getGolfers);

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
const filter = {};

const coll = client.db('golf-tracker').collection('golfers');
const cursor = coll.find(filter);
const result = await cursor.toArray();
console.log(result);
await client.close();

export default getGolfers;