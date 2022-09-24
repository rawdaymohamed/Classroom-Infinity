import mongoose from "mongoose";
const EnrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
  },
  createdDate: { type: Date, default: Date.now() },
});
export default mongoose.model("Enrollment", EnrollmentSchema);
