import express, { Express, Request, Response } from 'express';
import { ApiDataSource } from '../config/pgDb.ts';
import { BookEntity } from '../models/entity/Book.entity.ts';
import { UserBookEntity } from '../models/entity/UserBook.entity.ts';
import { In } from 'typeorm';

const app: Express = express();

app.post("/", async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let idUser = body.token.split(":")[0];
        const userBooks = await ApiDataSource.manager.getRepository(UserBookEntity)
            .find({
                where: { idUser: idUser }
            });
        const savedBooks = await ApiDataSource.manager.getRepository(BookEntity)
            .find({
                where: { id: In(userBooks.map(ub => ub.idBook)) }
            });
        const listBooks: Array<any> = [];
        for (const savedBook in savedBooks) {
            if (Object.prototype.hasOwnProperty.call(savedBooks, savedBook)) {
                const element = savedBooks[savedBook];
                const jsonBook = JSON.parse(JSON.stringify(element));
                jsonBook.photo = element.photo?.toString("base64");
                jsonBook.quantity = userBooks.find(ub => ub.idBook === element.id)?.quantity;
                jsonBook.finish = userBooks.find(ub => ub.idBook === element.id)?.finish;
                listBooks.push(jsonBook);
            }
        }
        return res.json(listBooks);
    } catch (error) {
        return res.status(500).json();
    }
});

export default app;