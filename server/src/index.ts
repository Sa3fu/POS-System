import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AppDataSource from "./config/db.js";
import router from "./routes/index.js";
import setupAuthMiddleware from "./middlewares/authmiddleware.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

setupAuthMiddleware(app);

app.use(router);

//@ts-ignore
app.get("/", (req, res) => {
  res.send({ msg: "HELLO WORLD" });
});

const PORT = process.env.PORT || 8000;

AppDataSource.initialize()
  .then(() => {
    console.log("Db connected");
    app.listen(PORT, () => {
      console.log("Server Connected");
    });
  })
  .catch((error) => {
    console.log(error);
    console.error(error.stack);
  });
