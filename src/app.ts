import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import router from "./routes";

require("./strategies/discord");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(
  session({
    secret: "abuble",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 * 24 * 7, httpOnly: true },
    // store:
  })
);

app.use(passport.initialize());
app.use(passport.session());

// app.use((request: Request, response: Response, next: Next) => {
//   if (request.session && !request.session.regenerate) {
//     request.session.regenerate = (cb) => {
//       cb();
//     };
//   }
//   if (request.session && !request.session.save) {
//     request.session.save = (cb) => {
//       cb();
//     };
//   }
//   next();
// });

app.use("/", router);

export default app;
