import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CardActions from "@mui/material/CardActions";
import ErrorIcon from "@mui/icons-material/Error";
import { editCourse, readCourse } from "./api-course";
import { isAuthenticated } from "../auth/auth-helper";
import { Navigate, useParams } from "react-router-dom";
const EditCourse = () => {
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [error, setError] = React.useState("");
  const [redirectToHome, setRedirectToHome] = React.useState(false);
  const { courseId } = useParams();
  const jwt = isAuthenticated();
  React.useEffect(() => {
    readCourse(courseId, null).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        setName(data.name);
        setImage(data.image);
        setCategory(data.category);
        setDescription(data.description);
      }
    });
  }, [courseId]);
  const handleSubmit = () => {
    let courseData = new FormData();
    name && courseData.append("name", name);
    description && courseData.append("description", description);
    image && courseData.append("image", image);
    category && courseData.append("category", category);

    editCourse(jwt.user._id, jwt, courseId, courseData).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        console.log(data);
        setError("");
        setRedirectToHome(true);
      }
    });
  };
  if (redirectToHome) return <Navigate to="/" />;

  return (
    <>
      <Card
        sx={{ maxWidth: 600, mx: "auto", my: 2, textAlign: "center", p: 1 }}
      >
        <CardContent>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            Edit Course
          </Typography>
          <Box sx={{ mx: "auto", maxWidth: 600 }}>
            <div>
              <Button
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
                component="label"
              >
                Upload <FileUploadIcon />
                <input
                  hidden
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                />
              </Button>
              <span>{image ? image.name : ""}</span>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: "266px" }} variant="outlined">
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  position="end"
                  label="Name"
                />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: "266px" }} variant="outlined">
                <InputLabel htmlFor="description">Description</InputLabel>
                <OutlinedInput
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  position="end"
                  label="Description"
                  multiline
                />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: "266px" }} variant="outlined">
                <InputLabel htmlFor="name">Category</InputLabel>
                <OutlinedInput
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  position="end"
                  label="Category"
                />
              </FormControl>
            </div>

            <br />
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
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "center", mb: 2 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default EditCourse;
