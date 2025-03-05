import { Router } from "express";
import { loginController } from "../controllers/loginController";
import { getTasklistById, putTasklistsController } from "../controllers/tasklistsController";
import { getDownloadPresignedUrl, getUploadPresignedUrl } from "../controllers/awsController";
import { addCleaningReport, getCleaningReports } from "../controllers/cleaningController";
import { getTimeclockEntries, addTimeclockEntry, clearTimeclockEntry } from "../controllers/timeclockController";

const router = Router();

router.post("/locations/:corpShortName/:locationShortName/login", loginController);
router.get("/locations/:locationShortName/tasklist", getTasklistById);
router.put("/locations/:locationShortName/tasklist", putTasklistsController);
router.get("/aws/presignedurl/:objectKey", getDownloadPresignedUrl);
router.put("/aws/presignedurl/:objectKey", getUploadPresignedUrl);
router.post("/locations/:locationShortName/cleaningreports", addCleaningReport);
router.get("/locations/:locationShortName/cleaningreports", getCleaningReports);
router.get("/locations/:locationShortName/:userId/timeclock", getTimeclockEntries);
router.post("/locations/:locationShortName/:userId/timeclock", addTimeclockEntry);
router.delete("/locations/:locationShortName/:userId/timeclock/:timeclockEntryId", clearTimeclockEntry);




export default router;

