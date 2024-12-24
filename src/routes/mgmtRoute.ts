import { Router } from "express";
import { loginController } from "../controllers/loginController";
import {
    checklistsControllerGetChecklist,
    checklistsControllerClearStatus,
    checklistsControllerUpdateItem
 } from "../controllers/checklistsController";

const router = Router();

router.post("/login", loginController);
router.get("/checklists/:checklistId", checklistsControllerGetChecklist);
router.post("/checklists/:checklistId/clearstatus", checklistsControllerClearStatus);
router.post("/checklists/:checklistId/update", checklistsControllerUpdateItem);

export default router;

