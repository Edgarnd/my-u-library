class Student {
    constructor(id, name, password, role, status, google) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.role = role;
        this.status = status;
        this.google = google;
    }
}

function toJson(student) {
    return JSON.stringify(student);
}

function fromJson(studentJson) {
    let student = JSON.parse(studentJson);
    return student;
}

export { Student, toJson, fromJson }
