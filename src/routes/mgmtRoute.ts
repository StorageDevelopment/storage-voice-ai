import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { getTasklistById, putTasklistsController } from "../controllers/tasklistsController";

const router = Router();

router.post("/locations/:locationShortName/login", loginController);
router.get("/locations/:locationShortName/tasklist", getTasklistById);
router.put("/locations/:locationShortName/tasklist", putTasklistsController);


export default router;

