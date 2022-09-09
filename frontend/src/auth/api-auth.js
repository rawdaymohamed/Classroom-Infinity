export const login = async (user) => {
  try {
    const response = await fetch('/auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    const response = await fetch('/auth/logout/', { method: 'GET' });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
