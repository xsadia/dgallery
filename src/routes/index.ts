import { Router } from "express";

import helloRouter from "./hello";
import authRouter from "./auth";

const router = Router();

router.use("/auth", authRouter);
router.use("/hello", helloRouter);

export default router;
