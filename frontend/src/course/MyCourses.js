import {useState, useEffect} from "react";
import {isAuthenticated} from "../auth/auth-helper"
import { listCourses } from "./api-course";
import {ListItemText, Typography, List, ListItem, ListItemAvatar, Avatar, Paper} from "@mui/material"
const MyCourses = () => {
    const [courses, setCourses] = useState([]);
    const jwt = isAuthenticated();
    const userId = isAuthenticated().user._id;
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        console.log("JWT", jwt)
        listCourses(userId, jwt, signal).then((data) => {
            if (data && data.error){
                console.log(data.error)
            } else if (data){
                setCourses(data);
            }
        })
        return function cleanup() {
            abortController.abort();
          };
    }, [userId, jwt])
    return <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', padding: 3 }}>
    <Typography variant='h5'> Your Courses</Typography>

   
<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {courses.map((course)=>(
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt={`${course.name} image`} variant="square" src={`/api/courses/${course.image}/image`} />
        </ListItemAvatar>
        <ListItemText
            primary={<Typography component="h6">{course.name}</Typography>}
            secondary={
            <>
                <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
                >
               {course.description}
                </Typography>
                
            </>
            }
        />
      </ListItem>))}
</List></Paper>}
export default MyCourses