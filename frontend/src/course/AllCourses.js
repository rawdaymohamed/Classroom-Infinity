import { useState, useEffect } from "react";
import { getAllCourses } from "./api-course";
import ErrorIcon from "@mui/icons-material/Error";

import {
  Paper,
  Typography,
  List,
  Link,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";

import { Link as BrowserLink } from "react-router-dom";
const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    getAllCourses().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        setError(null);
        setCourses(data);
      }
    });
  }, []);

  if (error) {
    return (
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
    );
  } else
    return (
      <>
        <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", padding: 3 }}>
          <Typography variant="h5">All Courses</Typography>

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {courses.map((course) => (
              <Link
                color="inherit"
                underline="none"
                component={BrowserLink}
                to={`/courses/${course._id}`}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={`${course.name} image`}
                      variant="square"
                      src={`/api/courses/${course._id}/photo`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="h6">{course.name}</Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {course.description}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Paper>
      </>
    );
};
export default AllCourses;
