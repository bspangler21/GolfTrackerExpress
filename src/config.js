import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = "mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority";