import http from "http";
import app from "./app";
import { config } from "dotenv";
config();

const PORT = process.env.PORT;

http.createServer(app).listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
