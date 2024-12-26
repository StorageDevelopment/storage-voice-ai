import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { getTasklistById, getTasklists, putTasklistsController } from "../controllers/taskListsController";

const router = Router();

router.post("/login", loginController);
router.get("/tasklists/:tasklistId", getTasklistById);
router.get("/tasklists", getTasklists);
router.put("/tasklists/:tasklistId", putTasklistsController);


export default router;

