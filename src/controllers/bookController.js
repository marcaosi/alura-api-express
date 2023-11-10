import book from "../models/Book.js"

class BookController{
    static async getBooks(req, res){
        try{
            const booksList = await book.find({})
            res.status(200).json(booksList)
        }catch(err){
            res.status(500).json({
                message: `${err.message} - Request Failed`
            })
        }
    }

    static async getBookById(req, res){
        try{
            const id = req.params.id
            const findedBook = await book.findById(id)
            res.status(200).json(findedBook)
        }catch(err){
            res.status(500).json({
                message: `${err.message} - Request Failed By Id`
            })
        }
    }

    static async createBook(req, res){
        try{
            const newBook = await book.create(req.body)
            res.status(201).send({
                message: "Book added successfuly!",
                book: newBook
            })
        }catch(err){
            res.status(500).json({
                message: `${err.message} - Error to add new book!`
            })
        }
    }

    static async updateBook(req, res){
        try{
            const id = req.params.id
            await book.findByIdAndUpdate(id, req.body)
            res.status(200).json({message: "Book Updated"})
        }catch(err){
            res.status(500).json({
                message: `${err.message} - Request Failed To Update`
            })
        }
    }

    static async removeBook(req, res){
        try{
            const id = req.params.id
            await book.findByIdAndDelete(id)
            res.status(203).json({message: "Book Deleted"})
        }catch(err){
            res.status(500).json({
                message: `${err.message} - Request Failed To Delete`
            })
        }
    }
}

export default BookController