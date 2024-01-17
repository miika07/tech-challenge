import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "fiap",
    password: "password",
    database: "tech-challenge-fiap",
    synchronize: true,
    logging: true,
    entities: ["src/domain/entities/*.ts"],
    subscribers: [],
    migrations: ["src/infra/data/database/migrations/*.ts"]
})