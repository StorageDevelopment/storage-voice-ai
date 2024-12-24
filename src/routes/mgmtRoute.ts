import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { usersControllerTaskList } from "../controllers/usersController";

const router = Router();

router.post("/login", loginController);
router.get("/users/:userId/list", usersControllerTaskList);

export default router;

