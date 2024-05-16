class GetMyBookReq {
    token: string;

    constructor(token?: string) {
        this.token = token ?? "";
    }
}

function toJson(getMyBookReq: GetMyBookReq): string {
    return JSON.stringify(getMyBookReq);
}

function fromJson(getMyBookReqStr: string): GetMyBookReq {
    let getMyBookReqJson = JSON.parse(JSON.stringify(getMyBookReqStr));
    let getMyBookReq = new GetMyBookReq(getMyBookReqJson["token"]);
    return getMyBookReq;
}

export { GetMyBookReq, toJson, fromJson }
