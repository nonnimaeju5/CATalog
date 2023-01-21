import { protect } from "./middleware/auth.js";
import express from "express";
import router from "./router.js";
import morgan from "morgan";
import cors from "cors";
import { createNewUser, signIn } from "./handlers/user.js";

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

app.use("/api", protect, router);
app.post("/signup", createNewUser);
app.post("/signin", signIn);
export default app;
