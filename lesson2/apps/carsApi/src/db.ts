require("dotenv").config();

import mongoose from "mongoose";

const {
    MONGODB_HOST,
    MONGODB_USER,
    MONGODB_PASSWORD,
    MONGODB_DATABASE_NAME,
    MONGODB_PORT
} = process.env

async function createConnection() {
    console.log("Creating mongoDB connection", MONGODB_HOST)
    // const credentials = MONGODB_USER && MONGODB_PASSWORD ? `${MONGODB_USER}:${MONGODB_PASSWORD}@` : ""
    try {
        await mongoose.connect(`mongodb://localhost:27017`,
            { useUnifiedTopology: true, useNewUrlParser: true })
        console.log(`Server is connected to: ${MONGODB_HOST}`)
    } catch (ex) {
        console.log(ex)
        process.exit(1)
    }
}

// async function getConnection() {
//     return mainConnection;
// }


export { createConnection }