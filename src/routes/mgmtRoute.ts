import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { putChecklistsController, getChecklistById, getChecklists } from "../controllers/checklistsController";

const router = Router();

router.post("/login", loginController);
router.get("/checklists/:checklistId", getChecklistById);
router.get("/checklists", getChecklists);
router.put("/checklists/:checklistId", putChecklistsController);


export default router;

