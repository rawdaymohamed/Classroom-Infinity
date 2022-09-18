import {useState, useEffect} from "react";
import {isAuthenticated} from "../auth/auth-helper"
import { listCourses } from "./api-course";
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
    return <>Your Courses
    {courses.map((course) => (<></>))}</>}
export default MyCourses