import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Set up the Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false, // Disable logging for production
});

export default sequelize;
