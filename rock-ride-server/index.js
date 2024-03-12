import express from "express";
import cors from "cors";
import logger from "morgan";
import Routes from "./src/routes/index.js";
import fileUpload from "express-fileupload";
import { conn } from "./src/database.js";

const server = express();

conn
  .sync({ alter: true })
  .then(() => {
    console.log("DB Synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
    process.exit(1);
  });

server.use(logger("dev"));

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

server.use(cors());

server.use(express.static("public"));

server.use(Routes);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
