import { OptionsRoleEntity } from "../entity/OptionsRole.entity";

class UserInfoRes {
    id: number | undefined;
    idRole: number | undefined;
    email: string | undefined;
    role: string | undefined;
    options: Array<OptionsRoleEntity> | undefined;
    constructor(id?: number, idRole?: number, email?: string, role?: string, options?: Array<OptionsRoleEntity>) {
        this.id = id;
        this.idRole = idRole;
        this.email = email;
        this.role = role;
        this.options = options;
    }
}

function toJson(userInfoRes: UserInfoRes): string {
    return JSON.stringify(userInfoRes);
}

function fromJson(userInfoResStr: string): UserInfoRes {
    let userInfoResJson = JSON.parse(userInfoResStr);
    let userInfoRes = new UserInfoRes(userInfoResJson["id"], userInfoResJson["idRole"], userInfoResJson["email"],
        userInfoResJson["role"], userInfoResJson["options"]
    );
    return userInfoRes;
}

export { UserInfoRes, toJson, fromJson }
