"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv/config");
const AppDataSource = new typeorm_1.DataSource(process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
    }
    : {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
        logging: true,
        synchronize: false,
        entities: process.env.NODE_ENV === "production"
            ? ["dist/src/entities/*.ts"]
            : ["src/entities/*.ts"],
        migrations: process.env.NODE_ENV === "production"
            ? ["dist/src/migrations/*.ts"]
            : ["src/migrations/*.ts"],
    });
exports.default = AppDataSource;
