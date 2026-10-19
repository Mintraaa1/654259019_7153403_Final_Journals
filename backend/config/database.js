import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://dev_user:5z1PWZfe6KKchXABMSmmchBiWYyfbAO0@dpg-db3mcqrncjis73b0dm4g-a.singapore-postgres.render.com/product_db_7nql";

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});
