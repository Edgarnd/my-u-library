require("./config.ts");
import 'reflect-metadata';
import { DataSource } from "typeorm";
import * as PostgressConnectionStringParser from "pg-connection-string";

const connectionOptions = PostgressConnectionStringParser.parse(process.env.DB_URL ?? "");
export const ApiDataSource = new DataSource({
    type: "postgres",
    host: connectionOptions.host ?? "",
    port: Number(connectionOptions.port) ?? 5432,
    username: connectionOptions.user ?? "",
    password: connectionOptions.password ?? "",
    database: connectionOptions.database ?? "",
    schema: "dev",
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
})