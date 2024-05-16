class UserListRes {
    id: number | undefined;
    idRole: number | undefined;
    email: string | undefined;
    role: string | undefined;
    constructor(id?: number, idRole?: number, email?: string, role?: string) {
        this.id = id;
        this.idRole = idRole;
        this.email = email;
        this.role = role;
    }
}

function toJson(userListRes: UserListRes): string {
    return JSON.stringify(userListRes);
}

function fromJson(userListResStr: string): UserListRes {
    let userListResJson = JSON.parse(userListResStr);
    let userListRes = new UserListRes(userListResJson["id"], userListResJson["idRole"],
        userListResJson["email"], userListResJson["role"]);
    return userListRes;
}

export { UserListRes, toJson, fromJson }
