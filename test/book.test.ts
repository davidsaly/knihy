import * as request from "supertest";
import * as app from "../src/app";

const chai = require("chai");
const expect = chai.expect;

let sampleBookId;
let sampleAuthor;

describe("Get /book", () => {
    it("should return 404 on non-existing book", (done) => {
        request(app)
            .get("/book/blabook")
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.status).to.be.ok;
                expect(res.status).to.equal(404);
                done();
            });
    });
    it("should be able to get a list of books", done => {
        request(app).get("/book")
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.body).to.be.ok;
                expect(res.status).to.equal(200);
                expect(res.body.length).to.be.above(0);
                done();
            });
    });
});
describe("Post /book", () => {
    beforeEach(done => {
        request(app).get("/author")
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.body).to.be.ok;
                sampleAuthor = res.body[0]._id;
                done();
            });
    });
    it("should be able to post a new book", (done) => {
        request(app).post("/book")
            .send({
                title: "fooTitle",
                description: "fooDescription",
                authorRef: sampleAuthor,
            })
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.status).to.be.ok;
                expect(res.status).to.equal(200);
                done();
            });
    });
    it("should return an error when a book is posted without an author", (done) => {
        request(app).post("/book")
            .send({
                title: "fooTitle",
                description: "fooDescription",
            })
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.status).to.be.ok;
                expect(res.status).to.equal(500);
                done();
            });
    });
    it("should return an error when a book is posted with a wrong author", (done) => {
        request(app).post("/book")
            .send({
                title: "fooTitle",
                description: "fooDescription",
                authorRef: "monkey",
            })
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.status).to.be.ok;
                expect(res.status).to.equal(500);
                done();
            });
    });
});
describe("Delete /book", function () {
    beforeEach(done => {
        request(app).get("/author")
            .then(res => {
                expect(res.body).to.be.ok;
                sampleAuthor = res.body[0]._id;
            })
            .then(() => request(app).post("/book")
                .send({
                    title: "book",
                    description: "sample book to be deleted",
                    authorRef: sampleAuthor,
                })
                .then(res => {
                    expect(res.body).to.be.ok;
                    sampleBookId = res.body._id;
                    done();
                }));
    });
    it("should return an error when trying to delete a non-existing book", (done) => {
        request(app).post("/book/delete/blabook")
            .end((err, res) => {
                expect(res.status).to.be.ok;
                expect(res.status).to.equal(404);
                done();
            });
    });
    it("should be able to GET a book", (done) => {
        request(app)
            .get(`/book/${sampleBookId}`)
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.status).to.be.ok;
                expect(res.status).to.equal(200);
                done();
            });
    });
    it("should be able to delete a book", (done) => {
        request(app).post(`/book/delete/${sampleBookId}`)
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.status).to.be.ok;
                expect(res.status).to.equal(200);
                expect(res.body.message).to.equal("Book successfully deleted");
                done();
            });
    });
});
describe("Patch /book", function () {
    beforeEach(done => {
        request(app).get("/author")
            .then(res => {
                expect(res.body).to.be.ok;
                sampleAuthor = res.body[0]._id;
            })
            .then(() => {
                return request(app).post("/book")
                    .send({
                        title: "book to edit",
                        description: "sample book to be edited",
                        authorRef: sampleAuthor,
                    })
                    .then(res => {
                        expect(res.body).to.be.ok;
                        sampleBookId = res.body._id;
                        done();
                    });
            });
    });
    it("should be able to edit a book", done => {
        request(app).patch(`/book/${sampleBookId}`)
            .send({
                description: "This book was edited",
            })
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.body).to.be.ok;
                expect(res.status).to.equal(200);
                expect(res.body.description).to.equal("This book was edited");
                done();
            });
    });
});