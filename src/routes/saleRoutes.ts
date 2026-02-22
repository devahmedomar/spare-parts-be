import { Router } from "express";
import auth from "../middleware/auth";
import * as ctrl from "../controllers/saleController";

const router = Router();
router.use(auth);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", ctrl.create);
router.delete("/:id", ctrl.remove);

export default router;
