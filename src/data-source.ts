import { DataSource } from "typeorm";
import "reflect-metadata";
import { envConfig } from "./env/env";

export const dataSource = new DataSource({
  type: "postgres",
  port: Number(envConfig.get("DB_EXTERNAL_PORT")),
  username: envConfig.get("DB_USER"),
  password: envConfig.get("DB_PASSWORD"),
  database: envConfig.get("DB_NAME"),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false
});