class CheckoutReq {
    token: string;
    book: number;
    quantity: number;

    constructor(token?: string, book? :number, quantity?:number) {
        this.token = token ?? "";
        this.book = book ?? 0;
        this.quantity = quantity ?? 0;
    }
}

function toJson(checkoutReq: CheckoutReq): string {
    return JSON.stringify(checkoutReq);
}

function fromJson(checkoutReqStr: string): CheckoutReq {
    let checkoutReqJson = JSON.parse(JSON.stringify(checkoutReqStr));
    let checkoutReq = new CheckoutReq(checkoutReqJson["token"], checkoutReqJson["book"], checkoutReqJson["quantity"]);
    return checkoutReq;
}

export { CheckoutReq, toJson, fromJson }
