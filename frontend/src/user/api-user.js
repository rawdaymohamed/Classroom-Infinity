const create = async (user) => {
  try {
    const response = await fetch('/api/users/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const list = async (signal) => {
  try {
    const response = await fetch('/api/users/', {
      method: 'GET',
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const read = async (id, jwt, signal) => {
  try {
    const response = await fetch(`/api/users/${id}/`, {
      method: 'GET',
      signal: signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (id, jwt, user) => {
  try {
    const response = await fetch(`/api/users/${id}/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
      // body: JSON.stringify(user),
      body: user,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (id, jwt) => {
  try {
    const response = await fetch(`/api/users/${id}/`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const follow = async (id, jwt, followId) => {
  try {
    const response = await fetch('/api/users/follow', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
      body: JSON.stringify({ userId: id, followId }),
    });
    console.log(JSON.stringify({ userId: id, followId }));
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const unfollow = async (id, jwt, unfollowId) => {
  try {
    const response = await fetch('/api/users/unfollow', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
      body: JSON.stringify({ userId: id, unfollowId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const findPeople = async (id, jwt) => {
  try {
    const response = await fetch(`/api/users/${id}/findpeople`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
export { list, create, read, update, remove, follow, unfollow, findPeople };
