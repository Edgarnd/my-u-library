class UserInfoReq {
    email: string;

    constructor(email?: string) {
        this.email = email ?? "";
    }
}

function toJson(userInfoReq: UserInfoReq): string {
    return JSON.stringify(userInfoReq);
}

function fromJson(userInfoReqStr: string): UserInfoReq {
    let userInfoReqJson = JSON.parse(userInfoReqStr);
    let userInfoReq = new UserInfoReq(userInfoReqJson["email"]);
    return userInfoReq;
}

export { UserInfoReq, toJson, fromJson }
