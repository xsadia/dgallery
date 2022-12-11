import { Router } from "express";

import helloRouter from "./hello";
import authRouter from "./auth";
import meRouter from "./me";

const router = Router();

router.use("/auth", authRouter);
router.use("/hello", helloRouter);
router.use("/me", meRouter);

export default router;
