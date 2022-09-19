import Course from "../models/course.model";
import formidable from "formidable";
import extend from "lodash/extend";
import fs from "fs";
import { json } from "body-parser";

export const createCourse = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let course = new Course(fields);
    console.log(course);
    course.updated = Date.now();
    course.instructor = req.profile;
    if (files.image) {
      course.image.data = fs.readFileSync(files.image.filepath);
      course.image.contentType = files.image.type;
    }
    console.log(course);
    try {
      const result = await course.save();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({
        error: "Sorry we couldn't create the course",
      });
    }
  });
};
export const courseByID = async (req, res, next, courseId) => {
  try {
    const course = await Course.findById(courseId).populate(
      "instructor",
      "_id name"
    );

    if (!course)
      return res.status(404).json({
        error: "Sorry this course doesn't exist",
      });
    req.course = course;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not find course",
    });
  }
};
export const isInstructor = async (req, res, next) => {
  const isInstructor = req.profile && req.profile.instructor;
  if (!isInstructor) {
    return res.status(403).json({ error: "Sorry user isn't instructor" });
  }
  next();
};
export const isAuthorizedInstructor = async (req, res, next) => {
  const isAuthInstructor =
    req.course && req.auth && req.course.instructor._id == req.auth._id;
  if (!isAuthInstructor) {
    return res.json({ error: "User isn't authorized" });
  }
  next();
};
export const courseList = (req, res) => {
  Course.find({ instructor: req.profile._id }, (err, courses) => {
    if (err) {
      return res.status(400).json({ error: "Sorry we couldn't find courses" });
    }
    return res.json(courses);
  }).populate("instructor", "_id name");
};
export const getCoursePhoto = (req, res) => {
  if (req.course.image.data) {
    res.set("Content-Type", req.course.image.contentType);
    return res.send(req.course.image.data);
  } else {
    return res.sendFile("course.jpg", { root: "public" });
  }
};

export const courseDefaultPhoto = (req, res) => {
  return res.sendFile("course.jpg", { root: "public" });
};
export const readCourse = (req, res) => {
  req.course.image = undefined;
  return res.status(200).json(req.course);
};
