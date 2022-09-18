export const createCourse = async (userId, jwt, course) => {
    try{
        const response = await fetch(`/api/users/${userId}/courses`, {
            method: "POST",
            headers:{
                "Accept": "application/json",
                "Authorization": "Bearer " + jwt.token,
            },
            body: course
        })
        return await response.json();
    }catch(err){console.log(err)}
}