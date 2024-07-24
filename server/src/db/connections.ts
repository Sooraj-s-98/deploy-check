import {connect, disconnect} from "mongoose"

async function connectToDatabase() {
    try {
        await connect(process.env.MONGO_URL)
    } catch (error) {
        console.log("DB connection error: ", error)
        throw new Error("Could not connect to DB")
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect()
    } catch (error) {
        console.log("DB disconnet error ", error)
        throw new Error("Could not disconnect from DB")
    }
}

export {connectToDatabase, disconnectFromDatabase}