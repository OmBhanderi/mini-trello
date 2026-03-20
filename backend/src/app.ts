import express from "express";
import cors from "cors";
import routes from "./routes/index";

const app = express();

app.use(cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true, // IMPORTANT for cookies
  }));
app.use(express.json());
app.use("/api", routes);

export default app;