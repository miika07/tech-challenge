import { DataSource } from "typeorm";

export const AppDataSourceTest = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "fiap-test",
    password: "password",
    database: "tech-challenge-fiap-test",
    logging: true,
    entities: ["src/domain/entities/*.ts"],
    migrations: ["src/infra/data/database/migrations/*.ts"],
    synchronize: true,
    dropSchema: true
})

  