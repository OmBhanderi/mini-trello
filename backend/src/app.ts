import express from "express";
import cors from "cors";
import routes from "./routes/index";
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // IMPORTANT for cookies
  }));

app.use(express.json());
app.use(cookieParser())
app.use("/api", routes);

export default app;