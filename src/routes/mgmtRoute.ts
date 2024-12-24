import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { checklistsControllerGet } from "../controllers/checklistsController";

const router = Router();

router.post("/login", loginController);
router.get("/checklists/:checklistId", checklistsControllerGet);

export default router;

