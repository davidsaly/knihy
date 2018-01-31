import * as _ from "lodash";
import { Request, Response } from "express";
import { Author, IAuthor } from "./../models/Author";

// GET
// All authors
export const index = (req: Request, res: Response) => {
    Author.find((err, authors) => {
        if (err) {
            res.status(404).send(err);
        } else if (authors) {
            res.status(200).send(authors);
        }
    });
};

// POST
export const postAuthor = (req: Request, res: Response) => {
    const author = new Author(req.body);
    author.save((err, createdAuthor) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(createdAuthor);
    });
};