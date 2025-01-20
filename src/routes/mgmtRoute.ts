import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { getTasklistById, putTasklistsController } from "../controllers/tasklistsController";
import { getDownloadPresignedUrl, getUploadPresignedUrl } from "../controllers/awsController";

const router = Router();

router.post("/locations/:locationShortName/login", loginController);
router.get("/locations/:locationShortName/tasklist", getTasklistById);
router.put("/locations/:locationShortName/tasklist", putTasklistsController);
router.get("/aws/presignedurl/:objectKey", getDownloadPresignedUrl);
router.put("/aws/presignedurl/:objectKey", getUploadPresignedUrl);


export default router;

