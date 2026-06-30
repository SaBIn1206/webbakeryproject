import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
import { uploads } from "../middlewares/upload.middleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", (req, res) => userController.createUser(req, res));
userRouter.post("/login", (req, res) => userController.loginUser(req, res));

userRouter.get("/whoami", authorizedMiddleware, userController.whoami);

userRouter.put(
  "/update",
  authorizedMiddleware,
  uploads.single("profileImage"),
  userController.updateUser
);

userRouter.put(
  "/update-password",
  authorizedMiddleware,
  userController.updatePassword
);

export default userRouter;
