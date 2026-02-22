import { Router } from "express";
import auth from "../middleware/auth";
import * as ctrl from "../controllers/returnController";

const router = Router();
router.use(auth);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;
