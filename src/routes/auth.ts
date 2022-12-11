import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/discord",
  passport.authenticate("discord"),
  (request, response) => {
    return response.status(200);
  }
);

router.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (request, response) => {
    return response.json({ message: "success" });
  }
);

export default router;
