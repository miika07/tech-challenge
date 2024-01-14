import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      database: 'tech-challenge-fiap',
      user: 'fiap',
      password: 'password',
      host: 'mysql',
    },
    migrations: {
      directory: './src/infra/data/database/migrations',
      tableName: 'knex_migrations',
    },
  },
  local: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'fiap',
      password: 'password',
      database: 'tech-challenge-fiap',
    },
    migrations: {
      directory: './src/infra/data/database/migrations',
      tableName: 'knex_migrations',
    },
  },
  staging: {},
  production: {}
};

module.exports = config;
