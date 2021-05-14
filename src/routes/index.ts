import { Router } from "express";

const routes = Router();

routes.get("/", (request, response) => {
	response.json({ message: "Server Ok" });
});
export default routes;
