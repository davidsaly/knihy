import * as mongoose from "mongoose";
import * as _ from "lodash";

function lengthValidator(v: any) {
    return this.authorRef.length > 0;
}

const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    authorRef: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author",
        }],
        required: true,
        validate: [lengthValidator, "Have to provide at least one author"],
    },
});

export const Book = mongoose.model<IBook>("Book", BookSchema);

export interface IBook extends mongoose.Document {
    title: string;
    description: string;
}