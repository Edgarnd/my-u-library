import express, { Express, Request, Response } from 'express';
import { ApiDataSource } from '../config/pgDb.ts';
import { UserEntity } from '../models/entity/User.entity.ts';
import { OptionsRoleEntity } from '../models/entity/OptionsRole.entity.ts';
import { RolesEntity } from '../models/entity/Roles.entity.ts';
import { UserInfoRes } from '../models/res/UserInfoRes.ts';

const app: Express = express();

app.post("/info", async (req: Request, res: Response) => {
    let body = req.body;
    let emailUser = body.email;
    const savedUser = await ApiDataSource.manager.getRepository(UserEntity)
        .findOne({
            where: { email: emailUser }
        });
    if (savedUser !== undefined && savedUser !== null) {
        const savedRole = await ApiDataSource.manager.getRepository(RolesEntity)
            .findOne({
                where: { id: savedUser.idRole }
            });
        if (savedRole !== undefined && savedRole !== null) {
            const optionsRoles = await ApiDataSource.manager.getRepository(OptionsRoleEntity)
                .find({
                    where: { idRole: savedUser.idRole }
                });
            if (optionsRoles !== undefined && optionsRoles !== null && optionsRoles.length > 0) {
                let userInfo = new UserInfoRes();
                userInfo.email = savedUser.email;
                userInfo.id = savedUser.id;
                userInfo.idRole = savedUser.idRole;
                userInfo.options = optionsRoles;
                userInfo.role = savedRole.title;
                return res.json(userInfo);
            }
        }
    }

    return res.status(400);
});

app.post("/register", async (req: Request, res: Response) => {
    let body = req.body;
    let userEntity = new UserEntity();
    userEntity.email = body.email;
    userEntity.idRole = body.role;
    userEntity = await ApiDataSource.manager.save(userEntity);
    return res.json(userEntity);
});

export default app;