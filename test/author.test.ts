import * as request from "supertest";
import * as app from "../src/app";

const chai = require("chai");
const expect = chai.expect;

describe("GET index of authors", () => {
    // workaround - database still being seeded
    beforeEach(done => {
        setTimeout(() => done(), 2000);
    });
    it("should be able to get a list of authors", done => {
        request(app).get("/author")
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.body).to.be.ok;
                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(2);
                done();
            });
    });
});
describe("Post /author", () => {
    it("should be able to post a new author", done => {
        request(app).post("/author")
            .send({
                name: "Jara Cimrman",
            })
            .end((err, res) => {
                if (err) { return done(err); }
                expect(res.status).to.be.ok;
                expect(res.status).to.equal(200);
                done();
            });
    });
});