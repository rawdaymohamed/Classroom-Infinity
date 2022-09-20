import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { isAuthenticated } from "../auth/auth-helper";
import { newLesson } from "./api-course";
const NewLesson = ({ courseId, addLesson }) => {
  const [values, setValues] = useState({
    title: "",
    content: "",
    resourceUrl: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const clickSubmit = () => {
    const jwt = isAuthenticated();
    const lesson = {
      title: values.title || undefined,
      content: values.content || undefined,
      resourceURL: values.resourceUrl || undefined,
    };
    
    newLesson(courseId, jwt, lesson).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else if (data) {
        addLesson(data);
        setValues({ ...values, title: "", content: "", resourceUrl: "" });
        setIsOpen(false);
        console.log(data);
      }
    });
  };
  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AddIcon /> New Lesson
      </Button>
      <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle>Add New Lesson</DialogTitle>
        <DialogContent sx={{ width: 500, mx: "auto" }}>
          <TextField
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={values.title}
            onChange={handleChange("title")}
          />
          <br />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            multiline
            rows="5"
            fullWidth
            value={values.content}
            onChange={handleChange("content")}
          />
          <br />
          <TextField
            margin="dense"
            label="Resource link"
            type="text"
            fullWidth
            value={values.resourceUrl}
            onChange={handleChange("resourceUrl")}
          />
          <br />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={clickSubmit} color="secondary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default NewLesson;
