import * as mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
    name: String,
});

export const Author = mongoose.model<IAuthor>("Author", AuthorSchema);

export interface IAuthor extends mongoose.Document {
    name: string;
}