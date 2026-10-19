import express from "express";
import cors from "cors";
import { sequelize } from "./config/database.js";
import journalRoutes from "./routes/journalRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/journals", journalRoutes);

// ทดสอบเชื่อมต่อ Database โดยไม่ทำให้เซิร์ฟเวอร์แครช
sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL Database connected successfully!");
    return sequelize.sync({ alter: true });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
