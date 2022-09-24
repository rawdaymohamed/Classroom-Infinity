import Enrollment from "../models/enrollment.model";
export const enroll = async (req, res) => {
  const course = req.course;
  const user = req.profile;
  if (!course.published) {
    return res.status(400).json({ error: "Couldn't register in course" });
  }

  try {
    const enrollmentExists = await Enrollment.findOne({
      userId: user._id,
      courseId: course._id,
    });
    if (enrollmentExists)
      return res
        .status(400)
        .json({ error: "You already registered in this course" });

    const enrollment = new Enrollment({
      userId: user._id,
      courseId: course._id,
    });
    await enrollment.save();
    const result = await (
      await enrollment.populate("userId", "_id name")
    ).populate("courseId", "_id name");
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: "Couldn't enroll in course" });
  }
};
