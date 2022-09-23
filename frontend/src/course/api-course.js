export const createCourse = async (userId, jwt, course) => {
  try {
    const response = await fetch(`/api/users/${userId}/courses`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + jwt.token,
      },
      body: course,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
export const listCourses = async (userId, jwt, signal) => {
  try {
    const response = await fetch(`/api/users/${userId}/courses`, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + jwt.token,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
export const readCourse = async (courseId, signal) => {
  try {
    const result = await fetch(`/api/courses/${courseId}`, {
      method: "GET",
      signal: signal,
    });
    return result.json();
  } catch (err) {
    console.log(err);
  }
};
export const newLesson = async (courseId, jwt, lesson) => {
  try {
    const result = await fetch(`/api/courses/${courseId}/lessons/new`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lesson),
    });
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};
export const publishCourse = async (courseId, jwt) => {
  try {
    const result = await fetch(
      `/api/users/${jwt.user._id}/courses/${courseId}/publish`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + jwt.token,
        },
      }
    );
    return await result.json();
  } catch (err) {
    console.log(err);
  }
};
export const deleteCourse = async (courseId, jwt) =>{
  try {
    const result = await fetch(
      `/api/users/${jwt.user._id}/courses/${courseId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + jwt.token,
        },
      }
    );
    return await result.json();
  } catch (err) {
    console.log(err);
  }
 
}