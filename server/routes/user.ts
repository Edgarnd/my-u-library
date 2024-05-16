import express, { Express, Request, Response } from 'express';
import { ApiDataSource } from '../config/pgDb.ts';
import { UserEntity } from '../models/entity/User.entity.ts';
import { OptionsRoleEntity } from '../models/entity/OptionsRole.entity.ts';
import { RolesEntity } from '../models/entity/Roles.entity.ts';
import { UserInfoRes } from '../models/res/UserInfoRes.ts';
import { UserListRes } from '../models/res/UserListRes.ts';
import { auth, createUserWithEmailAndPassword } from '../../src/domain/util/firebase.ts';

const app: Express = express();

app.post("/info", async (req: Request, res: Response) => {
    try {
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
        return res.status(400).json();
    } catch (error) {
        return res.status(500).json();
    }
});

app.post("/register", async (req: Request, res: Response) => {
    try {
        let body = req.body;
        let userEntity = new UserEntity();
        userEntity.email = body.email;
        userEntity.idRole = body.role;
        if (userEntity.email !== undefined && userEntity.email !== null) {
            if(body.password !== undefined && body.password !== null){
                let userCredential = await createUserWithEmailAndPassword(auth, userEntity.email, body.password);
                if (userCredential !== undefined && userCredential !== null) {
                    if (userCredential.user !== undefined && userCredential !== null) {
                        userEntity = await ApiDataSource.manager.save(userEntity);
                        return res.json(userEntity);
                    }
                }
            } else {
                userEntity = await ApiDataSource.manager.save(userEntity);
                return res.json(userEntity);
            }
        }
        return res.status(400).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error});
    }
});

app.get("/", async (req: Request, res: Response) => {
    try {
        const savedUsers = await ApiDataSource.manager.find(UserEntity);
        const savedRoles = await ApiDataSource.manager.find(RolesEntity);
        const listUsers: Array<UserListRes> = [];
        for (let index = 0; index < savedUsers.length; index++) {
            const elementUser = savedUsers[index];
            const jsonUser = JSON.parse(JSON.stringify(elementUser));
            const userListRes = new UserListRes();
            userListRes.email = elementUser.email;
            userListRes.idRole = elementUser.idRole;
            userListRes.id = elementUser.id;
            userListRes.role = savedRoles.find(r => r.id === elementUser.idRole)?.title;
            listUsers.push(userListRes);
        }
        return res.json(listUsers);
    } catch (error) {
        return res.status(500).json();
    }
});

export default app;