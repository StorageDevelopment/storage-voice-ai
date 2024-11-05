import { Router } from "express";
import { toolsController } from "../controllers/toolsController";

const router = Router();

router.post("/", toolsController);

export default router;

