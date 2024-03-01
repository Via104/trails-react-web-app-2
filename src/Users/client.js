import axios from "axios";

const request = axios.create({
  withCredentials: true,
});


// export const USERS_API = process.env.REACT_APP_API_URL;
// export const USERS_API = "http://localhost:4000/api/users";
// export const TRAILS_API = "http://localhost:4000/api/trails";
// export const ADDTRAILS_API = "http://localhost:4000/api/addTrails";

const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;
const TRAILS_API = `${API_BASE}/trails`;
const ADDTRAILS_API = `${API_BASE}/addTrails`;

export const signin = async (user) => {

  const response = await request.post(`${USERS_API}/signin`, user);
  console.log(response.data);

  return response.data;
};

export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);

  return response.data;
};

export const updateUser = async (id, user) => {
  console.log("In client, ID: " + id + " username: " + user.username);
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const users = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};

export const deleteUser = async (user) => {
  const response = await request.delete(`${USERS_API}/${user._id}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await request.post(`${USERS_API}`, user);
  return response.data;
};

export const signup = async (user) => {
  const response = await request.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};

export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};

export const findUsersByRole = async (role) => {
  const response = await request.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findFavoritesByUserId = async (userId) => {
  const response = await request.get(`${USERS_API}/${userId}/favorites`);
  return response.data;
};

export const addToFavourites = async (userId, trail) => {
  const response = await request.put(
    `${USERS_API}/${userId}/favourites/${trail.id}`,
    trail
  );
  return response.data;
};

//  create a trail object in db
export const createTrail = async (trail) => {
  try {
    const response = await axios.post(`${TRAILS_API}/create`, {
      trailId: trail.id,
      name: trail.name,
      url: trail.url,
      length: trail.length,
      description: trail.description,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating trail:", error);
    throw error; // Re-throw the error for handling at a higher level if needed
  }
};

export const deleteTrail = async (trail) => {
  const response = await axios.delete(`${TRAILS_API}/${trail.id}`);
  return response.data;
};

// create a user-defined trail
export const addTrail = async (trail) => {
  try {
    const response = await axios.post(`${ADDTRAILS_API}/create`, {
      trailId: trail.id,
      name: trail.name,
      url: trail.url,
      length: trail.length,
      description: trail.description,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating trail:", error);
    throw error; // Re-throw the error for handling at a higher level if needed
  }
};

export const deleteCustomizedTrail = async (trail) => {
  const response = await axios.delete(`${ADDTRAILS_API}/${trail.id}`);
  return response.data;
};

export const findAllCustomizedTrails = async () => {
  const response = await axios.get(`${ADDTRAILS_API}`);
  return response.data;
};

export const findAllTrails = async () => {
  const options = {
    method: "GET",
    url: "https://trailapi-trailapi.p.rapidapi.com/trails/explore/",
    params: {
      lat: "38.79908",
      lon: "-104.88353",
    },
    headers: {
      "X-RapidAPI-Key": "d102ce3527mshc4b1f040aa83cb1p137adbjsn3f7e380a5e93",
      "X-RapidAPI-Host": "trailapi-trailapi.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const findTrailByID = async (searchID) => {
  const options = {
    method: "GET",
    url:
      "https://trailapi-trailapi.p.rapidapi.com/trails/" + searchID.toString(),
    headers: {
      "X-RapidAPI-Key": "d102ce3527mshc4b1f040aa83cb1p137adbjsn3f7e380a5e93",
      "X-RapidAPI-Host": "trailapi-trailapi.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data;
};

export const updateTrail = async (trail) => {
  const response = await request.put(`${TRAILS_API}/${trail.id}`, trail);
  return response.data;
};

// get all users who favored this trail
// export const getFavUsers = async (trailId) => {
//   const response = await axios.get(`${TRAILS_API}/${trailId}/users`);
//   return response.data;
// };

// update list of users associated with this trail
// export const addToFavouritesTrails = async (userId, trail) => {
//   await createTrail(trail, userId); // first create trail in db (with the current user id)
//   const userIds = await getFavUsers(trail.id); // get list of users associated with the given trail
//   const newUsers = [...userIds, userId]; // update users list
//   const response = await axios.put(`${TRAILS_API}/${trail.id}/users`, newUsers);
//   return response.data;
// };

// update a trail info in trails collection
// export const updateTrail = async (trail) => {
//   const response = await axios.put(`${TRAILS_API}/${trail.id}`, trail);
//   return response.data;
// };

// update a trail in user's favourites
// export const updateTrailUser = async (userId, trail) => {
//   const response = await axios.put(`${USERS_API}/${userId}/${trail.id}`, trail);
//   return response.data;
// };

