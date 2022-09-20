import express from "express";
import { hasAuthorization, requireLogin } from "../controllers/auth.controller";
import {
  createCourse,
  courseByID,
  isInstructor,
  courseList,
  isAuthorizedInstructor,
  getCoursePhoto,
  courseDefaultPhoto,
  readCourse,
  createLesson,
} from "../controllers/course.controller";
import { userByID } from "../controllers/user.controller";
const router = express.Router();

router
  .route("/api/users/:userId/courses")
  .post(requireLogin, hasAuthorization, isInstructor, createCourse)
  .get(requireLogin, hasAuthorization, courseList);
router.route("/api/courses/defaultphoto").get(courseDefaultPhoto);
router.route("/api/courses/:courseId").get(readCourse);
router.route("/api/courses/:courseId/photo").get(getCoursePhoto);
router.route("/api/courses/:courseId/lessons/new").put(createLesson);
router.param("userId", userByID);
router.param("courseId", courseByID);
export default router;
