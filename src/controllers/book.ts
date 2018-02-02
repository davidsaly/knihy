import * as _ from "lodash";
import { Request, Response } from "express";
import { Book, IBook } from "./../models/Book";

// POST
export const postBook = (req: Request, res: Response) => {
    const book = new Book(req.body);
    book.save((err, createdBook) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(createdBook);
    });
};

// PATCH
export const patchBook = (req: Request, res: Response) => {
    Book.findById(req.params.bookId, (err, book) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // update attributes
            _.set(book, "title", req.body.title || _.get(book, "title"));
            _.set(book, "description", req.body.description || _.get(book, "description"));
            _.set(book, "authorRef", req.body.authorRef || _.get(book, "authorRef"));
            // save in db
            book.save((err, book) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(book);
            });
        }
    });
};

// GET
// Get book by ID
export const getBook = (req: Request, res: Response) => {
    Book.findById(req.params.bookId, (err, book) => {
        if (err) {
            res.status(404).send(err);
        } else if (book) {
            res.status(200).send(book);
        }
    });
};

// Get a list of books (and resolves the authorRef)
export const index = (req: Request, res: Response) => {
    const allowedQueryFields = ["title", "description"];
    const query = _.pick(req.query, allowedQueryFields);
    Book.find(query).populate("authorRef").exec((err, books) => {
        if (err) {
            res.status(404).send(err);
        } else if (books) {
            res.status(200).send(books);
        }
    });
};

// DELETE
export const deleteBook = (req: Request, res: Response) => {
    Book.findByIdAndRemove(req.params.bookId, (err, book) => {
        const response = {
            message: "Book successfully deleted",
            // id: book._id
        };
        if (err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(response);
        }
    });
};