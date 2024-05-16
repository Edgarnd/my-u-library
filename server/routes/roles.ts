import express, { Express, Request, Response } from 'express';
import { ApiDataSource } from '../config/pgDb.ts';
import { RolesEntity } from '../models/entity/Roles.entity.ts';

const app: Express = express();

app.get("/", async (req: Request, res: Response) => {
    try {
        const rolesSaved = await ApiDataSource.manager.find(RolesEntity);
        const listRoles: Array<any> = [];
        for (const savedRole in rolesSaved) {
            if (Object.prototype.hasOwnProperty.call(rolesSaved, savedRole)) {
                const element = rolesSaved[savedRole];
                const jsonRole = JSON.parse(JSON.stringify(element));
                listRoles.push(jsonRole);
            }
        }
        return res.json(listRoles);
    } catch (error) {
        return res.status(500).json();
    }
});

export default app;