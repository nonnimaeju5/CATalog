import prisma from "../db.js";

export const getPosts = async (req, res, next) => {
	try {
		const posts = await prisma.post.findMany();
		res.json(posts);
	} catch (e) {
		next(e);
	}
};
