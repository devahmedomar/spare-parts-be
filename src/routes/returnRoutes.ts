import { Router } from "express";
import auth from "../middleware/auth";
import * as ctrl from "../controllers/returnController";

const router = Router();
router.use(auth);

router.get("/", ctrl.getAll);
router.post("/", ctrl.create);

export default router;
