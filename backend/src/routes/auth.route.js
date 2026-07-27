import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const route = Router();

route.post("/register", signUp);
route.post("/login",signIn);

export default route

