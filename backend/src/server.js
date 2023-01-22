import { protect } from "./middleware/auth.js";
import express from "express";
import router from "./router.js";
import morgan from "morgan";
import cors from "cors";
import { getPosts } from "./handlers/post.js";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	console.log("We've got a request! on path: '/'");
	res.json({ message: "hello" });
	res.status(200);
});
app.use("/posts", getPosts);
app.use("/api", protect, router);

export default app;
