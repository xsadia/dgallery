import Router from "@koa/router";
import passport from "koa-passport";

const router = new Router({
  prefix: "/auth",
});

router.get("/discord", passport.authenticate("discord"), (ctx) => {
  ctx.status = 200;
});

router.get("/discord/redirect", passport.authenticate("discord"), (ctx) => {
  ctx.body = {
    message: "success",
  };
});

export default router;
