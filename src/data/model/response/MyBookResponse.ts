import { MyBook } from "./MyBook.ts";

class MyBookResponse {
    books: MyBook[];

    constructor(books?: Array<MyBook>) {
        this.books = books ?? [];
    }
}

function toJson(myBookResponse: MyBookResponse): string {
    return JSON.stringify(myBookResponse);
}

function fromJson(myBookResponseStr: string): MyBook {
    let myBookResJson = JSON.parse(myBookResponseStr);
    let myBookRes = new MyBook(myBookResJson);
    return myBookRes;
}

export { MyBookResponse, toJson, fromJson }
