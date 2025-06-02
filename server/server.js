import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connection from "./utils/connection.js";
import route from "./router/router.js";
let app = express();
let port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// db conection
connection();

// router
app.use("/api", route);
app.listen(port, console.log(`http://localhost:${port}`));
