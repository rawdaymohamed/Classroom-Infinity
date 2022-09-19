import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { readCourse } from "./api-course";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";

import { Link } from "react-router-dom";
const Course = () => {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const { courseId } = useParams();
  const photoUrl = `http://localhost:4000/api/courses/${courseId}/photo`;
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readCourse(courseId, signal).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        setCourse(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [courseId]);
  if (!course) return <h3>No course found</h3>;
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
            {isAuthenticated() && isAuthenticated().user.instructor && (
              <>
                <IconButton size="small">
                  <DeleteIcon />
                </IconButton>
                {!course.published && (
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                )}
                {!course.published && <Button size="medium">Publish</Button>}
              </>
            )}
          </CardActions>
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
