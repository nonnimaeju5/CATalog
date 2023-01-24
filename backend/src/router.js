import { Router } from "express";
const router = Router();

/**Get/Update User */
// the functions here are empty you should import the once that are defined in post.js and user.js in the handlers folder
router.get("/users", () => {});
router.post("/user", () => {}); // this one can be replaced with the createUser function in user.js
router.get("/user/:id", () => {}); //and this one should be replaced with the login function, this should actually be a post request since you are handling passwords here (even thoug it only reads from the database)
router.put("/user/:id", () => {});
router.delete("/user/:id", () => {});

/**Get/Update Post */
router.get("/posts", () => {}); //here you can replace this empty function with the getPosts function from post.js
router.post("/post", () => {});
router.get("/post/:id", () => {});
router.put("/post/:id", () => {});
router.delete("/post/:id", () => {});

export default router;
