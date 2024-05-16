class UserRegisterReq {
    email: string;
    password: string;
    role: string;

    constructor(email?: string, password?: string, role?: string) {
        this.email = email ?? "";
        this.password = password ?? "";
        this.role = role ?? "";
    }
}

function toJson(userRegisterReq: UserRegisterReq): string {
    return JSON.stringify(UserRegisterReq);
}

function fromJson(userRegisterReqStr: string): UserRegisterReq {
    let userRegisterReqJson = JSON.parse(JSON.stringify(userRegisterReqStr));
    let userRegisterReq = new UserRegisterReq(userRegisterReqJson["email"], userRegisterReqJson["password"], userRegisterReqJson["role"]);
    return userRegisterReq;
}

export { UserRegisterReq, toJson, fromJson }
