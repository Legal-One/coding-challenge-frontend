import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./api/routes";

const app: Application = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Implement Cors
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port: number | string = process.env.PORT || 5000;

app.use("/", routes);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
