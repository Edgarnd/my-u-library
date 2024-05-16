import express, { Express, Request, Response } from 'express';
import { ApiDataSource } from '../config/pgDb.ts';
import { UserBookEntity } from '../models/entity/UserBook.entity.ts';
import { DateUtils } from '../util/dateUtil.ts';
import { StockBookEntity } from '../models/entity/StockBook.entity.ts';

const app: Express = express();

app.post("/", async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let idUser = body.token.split(":")[0];
        let idBook = body.book;
        let quantity = body.quantity;

        let userBookEntity = new UserBookEntity();
        userBookEntity.idUser = idUser;
        userBookEntity.idBook = idBook;
        userBookEntity.quantity = quantity;
        userBookEntity.finish = DateUtils.addDays(new Date(), 10).toISOString();
        await ApiDataSource.manager.save(userBookEntity);

        const stockBookSaved = await ApiDataSource.manager.getRepository(StockBookEntity)
            .findOne({
                where: { idBook: idBook }
            });
        if (stockBookSaved !== undefined && stockBookSaved !== null) {
            stockBookSaved.lend = (stockBookSaved?.lend ?? 0) + (userBookEntity.quantity ?? 0);
            stockBookSaved.quantity = (stockBookSaved?.quantity ?? 0) - (userBookEntity.quantity ?? 0);
            await ApiDataSource.manager.getRepository(StockBookEntity).update(stockBookSaved.id!, stockBookSaved);
        }

        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

export default app;