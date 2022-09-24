import express from "express";
import { hasAuthorization, requireLogin } from "../controllers/auth.controller";
import { userByID } from "../controllers/user.controller";
import { courseByID } from "../controllers/course.controller";
import { enroll } from "../controllers/enrollment.controller";
const router = express.Router();
router
  .route("/api/users/:userId/courses/:courseId/enroll")
  .post(requireLogin, hasAuthorization, enroll);
router.param("userId", userByID);
router.param("courseId", courseByID);

export default router;
