import { Router } from "express";
import {
    loginController,
    updateCredsController
} from "../controllers/loginController";
import {
    getTasklistById,
    putTasklistsController,
    getTaskReports
} from "../controllers/tasklistsController";
import {
    getDownloadPresignedUrl,
    getUploadPresignedUrl,
} from "../controllers/awsController";
import {
    addCleaningReport,
    getCleaningReports,
} from "../controllers/cleaningController";
import {
    getTimeclockEntries,
    addTimeclockEntry,
    clearTimeclockEntry,
    getDailyTimeclockEntries,
    getWorkSummary
} from "../controllers/timeclockController";

import { clearDay } from "../controllers/adminController";

const router = Router();

router.post(
    "/locations/:corpShortName/:locationShortName/login",
    loginController
);

router.post("/locations/:corpShortName/:locationShortName/updatecreds", updateCredsController);

router.get(
    "/locations/:corpShortName/:locationShortName/tasklist",
    getTasklistById
);
router.get(
    "/locations/:corpShortName/:locationShortName/taskreports",
    getTaskReports
);
router.put(
    "/locations/:corpShortName/:locationShortName/tasklist",
    putTasklistsController
);
router.get("/aws/presignedurl/:objectKey", getDownloadPresignedUrl);
router.put("/aws/presignedurl/:objectKey", getUploadPresignedUrl);
router.post(
    "/locations/:corpShortName/:locationShortName/cleaningreports",
    addCleaningReport
);
router.get(
    "/locations/:corpShortName/:locationShortName/cleaningreports",
    getCleaningReports
);
router.get(
    "/locations/:corpShortName/:locationShortName/:userId/timeclock",
    getTimeclockEntries
);
router.get(
    "/locations/:corpShortName/:locationShortName/:userId/timeclock/daily",
    getDailyTimeclockEntries
);
router.get(
    "/locations/:corpShortName/:locationShortName/timeclock/summary",
    getWorkSummary
);
router.post(
    "/locations/:corpShortName/:locationShortName/:userId/timeclock",
    addTimeclockEntry
);
router.delete(
    "/locations/:corpShortName/:locationShortName/:userId/timeclock/:timeclockEntryId",
    clearTimeclockEntry
);
router.put("/locations/:corpShortName/:locationShortName/clearDay", clearDay);

export default router;
