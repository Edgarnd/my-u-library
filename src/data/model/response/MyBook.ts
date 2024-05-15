class MyBook {
    id: string;
    title: string;
    description: string;
    photo: string;
    photoType: string;
    finish: string;

    constructor(id?: string, title?: string, description?: string, photo?: string, photoType?: string, finish?: string) {
        this.id = id ?? "";
        this.title = title ?? "";
        this.description = description ?? "";
        this.photo = photo ?? "";
        this.photoType = photoType ?? "";
        this.finish = finish ?? "";
    }
}

function toJson(myBook: MyBook): string {
    return JSON.stringify(myBook);
}

function fromJson(myBookStr: string): MyBook {
    let myBookJson = JSON.parse(myBookStr);
    let myBook = new MyBook(myBookJson["id"], myBookJson["title"], myBookJson["description"], myBookJson["photo"], myBookJson["photoType"], myBookJson["finish"]);
    return myBook;
}

export { MyBook, toJson, fromJson }
