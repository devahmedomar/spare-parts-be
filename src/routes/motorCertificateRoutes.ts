import { Router } from "express";
import auth from "../middleware/auth";
import upload from "../middleware/upload";
import * as ctrl from "../controllers/motorCertificateController";

const router = Router();
router.use(auth);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", upload.single("image"), ctrl.create);
router.put("/:id", upload.single("image"), ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;
