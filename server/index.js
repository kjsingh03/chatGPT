import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRouter from "./routes/chat.js";
import "dotenv/config";
import { getApiKey } from "./controllers/chat.js";
import path from 'path';

// Creating server

const app = Express();

// Database connection

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

main()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log(err));

// Port

const PORT = process.env.PORT

// Middlewares

app.use(cors())
    .use(Express.json())
    .use(Express.static(path.join(path.resolve(),'/dist')))
    .use("/chat", chatRouter)
    .get("/apikey", getApiKey)

// Listening Server

app.listen(PORT, () => {
    console.log(`Server is working at http://localhost:${PORT}`);
});
