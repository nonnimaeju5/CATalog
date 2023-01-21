import { Router } from "express";
const router = Router();

/**Get/Update User */

router.get("/users", () => {});
router.post("/user", () => {});
router.get("/user/:id", () => {});
router.put("/user/:id", () => {});
router.delete("/user/:id", () => {});

/**Get/Update Post */
router.get("/posts", () => {});
router.post("/post", () => {});
router.get("/post/:id", () => {});
router.put("/post/:id", () => {});
router.delete("/post/:id", () => {});

export default router;
