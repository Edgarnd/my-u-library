import express, { Express, Request, Response } from 'express';
import { ApiDataSource } from '../config/pgDb.ts';
import { BookEntity } from '../models/entity/Book.entity.ts';

const app: Express = express();

app.post("/", async (req: Request, res: Response) => {
    let body = req.body;
    let bookEntity = new BookEntity();
    bookEntity.title = body.title;
    bookEntity.author = body.author;
    bookEntity.genre = body.genre;
    bookEntity.description = body.description;
    bookEntity.revision = body.revision;
    bookEntity.yearPub = body.yearPub;
    bookEntity.photo = Buffer.from(body.photo, 'base64');
    bookEntity.photoType = body.photoType;
    await ApiDataSource.manager.save(bookEntity);
    return res.json(bookEntity);
});

app.get("/", async (req: Request, res: Response) => {
    const savedBooks = await ApiDataSource.manager.find(BookEntity);
    const listBooks: Array<any> = [];
    for (const savedBook in savedBooks) {
        if (Object.prototype.hasOwnProperty.call(savedBooks, savedBook)) {
            const element = savedBooks[savedBook];
            const jsonBook = JSON.parse(JSON.stringify(element));
            jsonBook.photo = element.photo?.toString("base64");
            listBooks.push(jsonBook);
        }
    }
    return res.json(listBooks);
});

export default app;