import express from "express";
import {
  activateUser,
  allCreaters,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getUserInfo,
  registrationUser,
  resetPassword,
  updatePassword,
  updateUser,
  updateUserRole,
} from "../controller/userController";
import { isLogin, validateRole } from "../middleware/userAuth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);

userRouter.get("/me", isLogin, getUserInfo);

userRouter.put("/update-user-info", isLogin, updateUser);
userRouter.put("/update-user-password", isLogin, updatePassword);

userRouter.post("/forgot-password", forgetPassword);
userRouter.post("/reset-password", resetPassword);

userRouter.get("/get-all-creaters", allCreaters);

userRouter.get("/get-users", isLogin, validateRole("admin"), getAllUsers);
userRouter.put("/update-user", isLogin, validateRole("admin"), updateUserRole);

userRouter.delete(
  "/delete-user/:id",
  isLogin,
  validateRole("admin"),
  deleteUser
);
export default userRouter;
