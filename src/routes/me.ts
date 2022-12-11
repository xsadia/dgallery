import { Router } from "express";

const router = Router();

router.get("/", (request, response) => {
  return response.json({ user: request.user });
});

export default router;
