import express from 'express'
import dbCon from './config/dbConnect.js'

import Book from './models/Book.js'

const con = await dbCon()

con.on('error', (err) => {
    console.error("Connection error", err)
})

con.once('open', () => {
    console.log("Connection estableshied!")
})

const books = [
    {
        id: 1,
        title: "O senhor dos anéis"
    },
    {
        id: 2,
        title: "O Hobbit"
    }
]

function searchBook(id){
    return books.findIndex(book => book.id === +id)
}

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("NodeJS running")
})

app.get("/books", async (req, res) => {
    const booksList = await Book.find({})
    res.status(200).json(booksList)
})

app.get("/books/:id", (req, res) => {
    const index = searchBook(req.params.id)

    res.status(200).json(books[index])
})

app.post("/books", (req, res) => {
    books.push(req.body)
    res.status(201).send("Book added")
})

app.put("/books/:id", (req, res) => {
    const index = searchBook(req.params.id)

    books[index].title = req.body.title
    res.status(200).send(books)
})

app.delete("/books/:id", (req, res) => {
    const index = searchBook(req.params.id)

    books.splice(index, 1)

    res.status(204).send("Book deleted!")
})



export default app