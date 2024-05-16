import { OptionRole } from "../OptionRole";

class UserInfoRes {
    id: number;
    idRole: number;
    email: string;
    role: string;
    options: OptionRole[];

    constructor(id?: number, idRole?: number, email?: string, role?: string, options?: OptionRole[]) {
        this.id = id ?? 0;
        this.idRole = idRole ?? 0;
        this.email = email ?? "";
        this.role = role ?? "";
        this.options = options ?? [];
    }
}

function toJson(userInfoRes: UserInfoRes): string {
    return JSON.stringify(userInfoRes);
}

function fromJson(userInfoResStr: string): UserInfoRes {
    let userInfoReqJson = JSON.parse(JSON.stringify(userInfoResStr));
    let userInfoReq = new UserInfoRes(userInfoReqJson["id"], userInfoReqJson["idRole"],
        userInfoReqJson["email"], userInfoReqJson["role"], userInfoReqJson["options"]);
    return userInfoReq;
}

export { UserInfoRes, toJson, fromJson }
