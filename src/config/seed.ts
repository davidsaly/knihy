
import { Book, IBook } from "./../models/Book";
import { Author, IAuthor } from "./../models/Author";
import * as _ from "lodash";

export const seedDatabase = () => {
    let author1: IAuthor;
    let author2: IAuthor;
    console.log("Seeding the database with sample Authors and Books");
    Author.find({}).remove()
        .then(() => Author.create(
            {
                name: "Pavol Dobsinsky",
            }))
        .then(author => {
            console.log("author1", author);
            author1 = author;
        })
        .then(() => Author.create(
            {
                name: "Hans Christian Andersen",
            }))
        .then(author => {
            console.log("author2", author);
            author2 = author;
        })
        .then(() => Book.find({}).remove())
        .then(() => Book.create({
            title: "Rozpravky",
            description: "Rozpravky",
            authorRef: [_.get(author1, "_id")],
        }))
        .then(book => {
            console.log("book1", book);
        })
        .then(() => Book.create({
            title: "Little Prince",
            description: "Little Price",
            authorRef: [_.get(author2, "_id")],
        }))
        .then(book => {
            console.log("book2", book);
        })
        .then(() => {
            console.log("Created seed data");
        });
};