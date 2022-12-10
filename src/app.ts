import Koa from "koa";
import cors from "@koa/cors";
import session from "koa-session";
import passport from "koa-passport";

import { helloRouter, authRouter } from "./routes";

require("./strategies/discord");

const app = new Koa();
app.use(cors());
app.use(
  session(
    {
      key: "auth",
      maxAge: 60 * 60 * 24 * 7,
      secure: false /** (boolean) secure cookie*/,
    },
    app
  )
);

app.use(passport.initialize());
app.use(passport.session());

app.use(helloRouter.routes()).use(helloRouter.allowedMethods());
app.use(authRouter.routes()).use(authRouter.allowedMethods());

export default app;
