import { Router } from "express";
import { config } from "dotenv";
import passport from "passport";
config();

const router = Router();

router.get(
  "/discord",
  passport.authenticate("discord"),
  (request, response) => {
    return response.status(302);
  }
);

router.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (request, response) => {
    return response.redirect(process.env.CLIENT_URL);
  }
);

export default router;
