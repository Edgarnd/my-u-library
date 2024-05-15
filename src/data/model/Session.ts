import { OptionRole } from "./OptionRole.ts";

class Session {
    id: string;
    name: string;
    email: string;
    role: string;
    options: OptionRole[];
    logged: boolean;

    constructor(id?: string, name?: string, email?: string, role?: string, options?: Array<OptionRole>, logged?: boolean) {
        this.id = id ?? "";
        this.name = name ?? "";
        this.email = email ?? "";
        this.role = role ?? "";
        this.options = options ?? [];
        this.logged = logged ?? false;
    }

    logout(): void {
        this.id = "";
        this.name = "";
        this.email = "";
        this.role = "";
        this.options = [];
        this.logged = false;
    }
}

function toJson(student: Session): string {
    return JSON.stringify(student);
}

function fromJson(studentStr: string): Session {
    let studentJson = JSON.parse(studentStr);
    let student = new Session(studentJson["id"], studentJson["name"], studentJson["email"], studentJson["role"], studentJson["options"], studentJson["logged"]);
    return student;
}

export { Session, toJson, fromJson }
