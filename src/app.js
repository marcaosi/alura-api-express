import express from 'express'
import dbCon from './config/dbConnect.js'
import routes from './routes/index.js'
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

routes(app)

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("NodeJS running")
})

app.delete("/books/:id", (req, res) => {
    const index = searchBook(req.params.id)

    books.splice(index, 1)

    res.status(204).send("Book deleted!")
})



export default app