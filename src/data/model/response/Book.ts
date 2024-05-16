import { MyBook } from "./MyBook.ts";

class Book extends MyBook {
    qtyLend: number | undefined;

    constructor(id?: string, title?: string, description?: string, author?: string,
        genre?: string, revision?: string, yearPub?: number, quantity?: number,
        photo?: string, photoType?: string, finish?: string, qtyLend?: number) {
        super(id, title, description, author, genre, revision, yearPub, quantity, photo, photoType, finish);
        this.qtyLend = qtyLend ?? 0;
    }
}

function toJson(book: Book): string {
    return JSON.stringify(book);
}

function fromJson(bookStr: string): Book {
    let myBookJson = JSON.parse(JSON.stringify(bookStr));
    let myBook = new Book(
        myBookJson["id"], myBookJson["title"], myBookJson["description"],
        myBookJson["author"], myBookJson["genre"], myBookJson["revision"],
        myBookJson["yearPub"], myBookJson["quantity"], myBookJson["photo"],
        myBookJson["photoType"], myBookJson["finish"], myBookJson["qtyLend"]);
    return myBook;
}

export { Book, toJson, fromJson }