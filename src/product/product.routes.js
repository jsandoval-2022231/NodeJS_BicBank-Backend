import { Router } from "express";
import * as ProductController from "./product.controller.js";

const router = Router();

router.post("/", ProductController.post);
router.get("/", ProductController.get);
router.get("/:id", ProductController.getOne);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.remove);

export default router;