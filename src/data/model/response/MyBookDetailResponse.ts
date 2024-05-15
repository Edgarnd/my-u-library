class MyBookDetailRes {
    title: string;
    description: string;
    revision: string;
    year: string;
    photo: string;
    photoType: string;
    finish: string;

    constructor(title?: string, description?: string, revision?: string, year?: string, photo?: string, photoType?: string, finish?: string) {
        this.title = title ?? "";
        this.description = description ?? "";
        this.revision = revision ?? "";
        this.year = year ?? "";
        this.photo = photo ?? "";
        this.photoType = photoType ?? "";
        this.finish = finish ?? "";
    }
}

function toJson(myBookDetailRes: MyBookDetailRes): string {
    return JSON.stringify(myBookDetailRes);
}

function fromJson(myBookDetailResStr: string): MyBookDetailRes {
    let myBookJson = JSON.parse(myBookDetailResStr);
    let myBook = new MyBookDetailRes(myBookJson["title"], myBookJson["description"], myBookJson["revision"], myBookJson["year"], myBookJson["photo"], myBookJson["photoType"], myBookJson["finish"]);
    return myBook;
}

export { MyBookDetailRes, toJson, fromJson }
