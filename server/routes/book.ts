import express, { Express, Request, Response } from 'express';
import { ApiDataSource } from '../config/pgDb.ts';
import { BookEntity } from '../models/entity/Book.entity.ts';
import { In, Like } from 'typeorm';
import { StockBookEntity } from '../models/entity/StockBook.entity.ts';

const app: Express = express();

app.post("/", async (req: Request, res: Response) => {
    try {
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
        bookEntity = await ApiDataSource.manager.save(bookEntity);
        let stockBookEntity = new StockBookEntity();
        stockBookEntity.idBook = bookEntity.id;
        stockBookEntity.lend = 0;
        stockBookEntity.quantity = body.quantity;
        await ApiDataSource.manager.save(stockBookEntity);
        return res.json(bookEntity);
    } catch (error) {
        return res.status(500).json();
    }
});

app.get("/", async (req: Request, res: Response) => {
    try {
        const savedBooks = await ApiDataSource.manager.find(BookEntity);
        const savedStocks = await ApiDataSource.manager.find(StockBookEntity);
        const listBooks: Array<any> = [];
        for (let index = 0; index < savedBooks.length; index++) {
            const elementBook = savedBooks[index];
            const elementStock = savedStocks[index];
            const jsonBook = JSON.parse(JSON.stringify(elementBook));
            jsonBook.photo = elementBook.photo?.toString("base64");
            jsonBook.quantity = elementStock.quantity;
            listBooks.push(jsonBook);
        }
        return res.json(listBooks);
    } catch (error) {
        return res.status(500).json();
    }
});

app.get("/query", async (req: Request, res: Response) => {
    try {
        let term = req.query.term?.toString().toLowerCase();
        const foundedBooks = await ApiDataSource.manager.getRepository(BookEntity)
            .find({
                where: {
                    title: Like(`%${term}%`)
                }
            });
        const foundedStocks = await ApiDataSource.manager.getRepository(StockBookEntity)
            .find({
                where: {
                    idBook: In(foundedBooks.map(b => b.id))
                }
            });
        const listBooks: Array<any> = [];
        for (let index = 0; index < foundedBooks.length; index++) {
            const elementBook = foundedBooks[index];
            const elementStock = foundedStocks[index];
            const jsonBook = JSON.parse(JSON.stringify(elementBook));
            jsonBook.photo = elementBook.photo?.toString("base64");
            jsonBook.quantity = elementStock.quantity;
            listBooks.push(jsonBook);
        }
        return res.json(listBooks);
    } catch (error) {
        return res.status(500).json();
    }
});

app.get("/recents", async (req: Request, res: Response) => {
    try {
        const foundedBooks = await ApiDataSource.manager.getRepository(BookEntity)
            .createQueryBuilder("book")
            .orderBy("book.id", "DESC")
            .limit(10)
            .getMany();
        const foundedStocks = await ApiDataSource.manager.getRepository(StockBookEntity)
            .find({
                where: {
                    idBook: In(foundedBooks.map(b => b.id))
                }
            });
        const listBooks: Array<any> = [];
        for (let index = 0; index < foundedBooks.length; index++) {
            const elementBook = foundedBooks[index];
            const elementStock = foundedStocks[index];
            const jsonBook = JSON.parse(JSON.stringify(elementBook));
            jsonBook.photo = elementBook.photo?.toString("base64");
            jsonBook.quantity = elementStock.quantity;
            listBooks.push(jsonBook);
        }
        return res.json(listBooks);
    } catch (error) {
        return res.status(500).json();
    }
});

export default app;