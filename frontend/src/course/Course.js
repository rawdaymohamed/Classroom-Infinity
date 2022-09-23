import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { publishCourse, readCourse, deleteCourse } from "./api-course";
import { isAuthenticated } from "../auth/auth-helper";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  Avatar,
  List,
  ListItemText,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";
import NewLesson from "./NewLesson";
const Course = ({ onDeleteCourse }) => {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [redirectCourse, setRedirectCourses] = useState(false);
  const { courseId } = useParams();
  const jwt = isAuthenticated();
  const photoUrl = `http://localhost:4000/api/courses/${courseId}/photo`;
  const addLesson = (data) => {
    setCourse(data);
  };
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readCourse(courseId, signal).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        setCourse(data);
        setError(null);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [courseId, jwt]);
  const onPublish = () => {
    publishCourse(courseId, jwt).then((data) => {
      if (data && data.error) {
        console.log(data.error);
        console.log(jwt);
        setError(data.error);
      } else if (data) {
        setCourse(data);
      }
    });
  };
  const onDelete = () => {
    deleteCourse(courseId, jwt).then((data) => {
      if (data && data.error) setError(data.error);
      else if (data) {
        setRedirectCourses(true);
      }
    });
  };

  if (!course) return <h3>No course found</h3>;
  if (redirectCourse) return <Navigate to={`/users/${jwt.user._id}/courses`} />;
  return (
    <>
      {course && (
        <Card sx={{ maxWidth: 400, mx: "auto" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image={photoUrl}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {course.name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              By{" "}
              <Link
                to={`/users/${course.instructor._id}/profile`}
                style={{ textDecoration: "none", color: "#000" }}
              >
                {course.instructor.name}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course.description}
            </Typography>
            <Chip
              label={`${course.category}`}
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </CardContent>
          <CardActions>
            {isAuthenticated() &&
              isAuthenticated().user.instructor &&
              isAuthenticated().user._id == course.instructor._id && (
                <>
                  <IconButton onClick={onDelete} size="small">
                    <DeleteIcon />
                  </IconButton>
                  {!course.published && (
                    <IconButton size="small" component={RouterLink} to={`/users/${jwt.user._id}/courses/${courseId}/edit`}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {!course.published && (
                    <Button size="medium" onClick={onPublish}>
                      Publish
                    </Button>
                  )}
                  <NewLesson courseId={courseId} addLesson={addLesson} />
                </>
              )}
          </CardActions>
          <div>
            <List>
              {course.lessons &&
                course.lessons.map((lesson, index) => {
                  return (
                    <span key={index}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>{index + 1}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={lesson.title} />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </span>
                  );
                })}
            </List>
          </div>
        </Card>
      )}

      {error && (
        <Typography
          component="p"
          color="error"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorIcon color="error" sx={{ mr: "3px" }}>
            error
          </ErrorIcon>
          {error}
        </Typography>
      )}
    </>
  );
};
export default Course;
