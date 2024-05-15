import express, { Express, Request, Response } from 'express';
import { ApiDataSource } from '../config/pgDb.ts';
import { UserBookEntity } from '../models/entity/UserBook.entity.ts';
import { DateUtils } from '../util/dateUtil.ts';

const app: Express = express();

app.post("/", async (req: Request, res: Response) => {
    let body = req.body;
    let idUser = body.token.split(":")[0];
    let idBook = body.book;
    let quantity = body.quantity;
    
    let userBookEntity = new UserBookEntity();
    userBookEntity.idUser = idUser;
    userBookEntity.idBook = idBook;
    userBookEntity.quantity = quantity;
    userBookEntity.finish = DateUtils.addDays(new Date(), 2).toISOString();

    await ApiDataSource.manager.save(userBookEntity);
    return res.status(200).send();
});

export default app;