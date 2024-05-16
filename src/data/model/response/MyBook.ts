class MyBook {
    id: string;
    title: string;
    description: string;
    author: string;
    genre: string;
    revision: string;
    yearPub: number;
    quantity: number;
    photo: string;
    photoType: string;
    finish: string;

    constructor(id?: string, title?: string, description?: string, author?: string,
        genre?: string, revision?: string, yearPub?: number, quantity?: number,
        photo?: string, photoType?: string, finish?: string) {
        this.id = id ?? "";
        this.title = title ?? "";
        this.description = description ?? "";
        this.author = author ?? "";
        this.genre = genre ?? "";
        this.revision = revision ?? "";
        this.yearPub = yearPub ?? 0;
        this.quantity = quantity ?? 0;
        this.photo = photo ?? "";
        this.photoType = photoType ?? "";
        this.finish = finish ?? "";
    }
}

function toJson(myBook: MyBook): string {
    return JSON.stringify(myBook);
}

function fromJson(myBookStr: string): MyBook {
    let myBookJson = JSON.parse(JSON.stringify(myBookStr));
    let myBook = new MyBook(
        myBookJson["id"], myBookJson["title"], myBookJson["description"],
        myBookJson["author"], myBookJson["genre"], myBookJson["revision"],
        myBookJson["yearPub"], myBookJson["quantity"], myBookJson["photo"],
        myBookJson["photoType"], myBookJson["finish"]);
    return myBook;
}

export { MyBook, toJson, fromJson }
