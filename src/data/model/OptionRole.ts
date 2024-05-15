class OptionRole {
    title: string;
    url: string;
    muiIcon: string;

    constructor(title?: string, url?: string, muiIcon?: string) {
        this.title = title ?? "";
        this.url = url ?? "";
        this.muiIcon = muiIcon ?? "";
    }
}

function toJson(optionRole: OptionRole): string {
    return JSON.stringify(optionRole);
}

function fromJson(optionRoleStr: string): OptionRole {
    let optionRoleJson = JSON.parse(optionRoleStr);
    let optionRole = new OptionRole(optionRoleJson["title"], optionRoleJson["url"], optionRoleJson["muiIcon"]);
    return optionRole;
}

export { OptionRole, toJson, fromJson }
