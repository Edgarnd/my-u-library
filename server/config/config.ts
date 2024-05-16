/*
 * File config server
 * 
 */

process.env.PORT = process.env.PORT || "8080";

//Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//DB
if (process.env.NODE_ENV === "dev") { }
let dbUrl: string = "postgresql://postgres:EvCtMPXiH6kKdSw@my-u-db.internal:5432/postgres?schema=public";

process.env.DB_URL = dbUrl;