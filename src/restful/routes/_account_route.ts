import express from "express";
import AuthValidate from "../../utils/validations/_user_validate";
import UserController from "../controllers/account";
import AuthMiddleWare from "../middlewares/_auth_middleware";
import { json } from "stream/consumers";

const accountRoutes = express.Router();

accountRoutes.get(
  "/",
  AuthMiddleWare.isLoggedIn,
  // AuthMiddleWare.isAdmin,
  UserController.getAllUsers
);
accountRoutes.post(
  "/create",
  AuthValidate.create,
  AuthMiddleWare.isAccountExist,
  UserController.createAccount
);
// "/login", AuthValidate.login,
accountRoutes.post("/login", AuthValidate.login, UserController.login);

accountRoutes.post(
  "/verify-account",
  AuthValidate.otp,
  UserController.verifyEmail
);

accountRoutes.post("/resend-otp", AuthValidate.email, UserController.resendOTP);

export default accountRoutes;
