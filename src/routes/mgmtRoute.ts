import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { checklistsControllerGetChecklist } from "../controllers/checklistsController";

const router = Router();

router.post("/login", loginController);
router.get("/checklists/:checklistId", checklistsControllerGetChecklist);

export default router;

