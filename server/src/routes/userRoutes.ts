import { Router } from "express";
import { getAllUsers, userSignup, userLogin, verifyUser, userLogout } from "../controllers/userContollers.js";
import { signupValidator, validate, loginValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/manageTokens.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup)
userRoutes.post("/login", validate(loginValidator), userLogin)
userRoutes.get("/auth-status", verifyToken, verifyUser)
userRoutes.get("/logout", verifyToken, userLogout)


export default userRoutes;