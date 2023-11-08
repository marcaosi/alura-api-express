// mongodb+srv://marcosantonio:6iI%A87xeZf06#CF@univas-database.o0py5nd.mongodb.net/?retryWrites=true&w=majority

import mongoose, {mongo} from 'mongoose'

async function dbConnect(){
    mongoose.connect("mongodb+srv://marcosantonio:admin123@univas-database.o0py5nd.mongodb.net/books?retryWrites=true&w=majority")

    return mongoose.connection
}

export default dbConnect