import { Routes, Route } from "react-router";
import NavBar from "./core/NavBar";
import NotFound from "./core/NotFound";
import Login from "./auth/Login";
import Signup from "./user/Signup";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import DeleteProfile from "./user/DeleteUser";
import NewCourse from "./course/NewCourse";
import PrivateRoute from "./privateRoute";
import MyCourses from "./course/MyCourses";
import Course from "./course/Course";
import EditCourse from "./course/EditCourse";
import AllCourses from "./course/AllCourses";
const Home = () => <>Home</>;

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/users/:userId/profile" element={<Profile />} />
      <Route exact path="/courses/:courseId" element={<Course />} />
      <Route
        exact
        path="/users/:userId/courses/new"
        element={
          <PrivateRoute>
            <NewCourse />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/users/:userId/courses/:courseId/edit"
        element={
          <PrivateRoute>
            <EditCourse />
          </PrivateRoute>
        }
      />

      <Route
        exact
        path="/users/:userId/courses"
        element={
          <PrivateRoute>
            <MyCourses />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/users/:userId/profile/edit"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/users/:userId/profile/delete"
        element={
          <PrivateRoute>
            <DeleteProfile />
          </PrivateRoute>
        }
      />
      <Route path="/courses/all" element={<AllCourses />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
