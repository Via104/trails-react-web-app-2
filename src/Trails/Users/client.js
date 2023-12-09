import axios from "axios";
const request = axios.create({withCredentials: true,})
// export const USERS_API = process.env.REACT_APP_API_URL;
export const USERS_API = "http://localhost:4000/api/users";
export const TRAILS_API = "http://localhost:4000/api/trails";

export const signin = async (user) => {
  const response = await request.post(`${USERS_API}/signin`, user);
  console.log(response.data);
  return response.data;
};

export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const users = async () => {
  const response = await request.get(`${USERS_API}`);
  console.log("here");
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

export const findfavoritesByUserId = async (id) => {
  const response = await request.get(`${USERS_API}/${id}/favorites`);
  return response.data;
};

export const addTofavorites = async (user, trail) => {
  try{ 
    const response = await request.put(
      `${USERS_API}/favorites/${user._id}/`,
      {user: user, trail: trail}
    );
    return response.data;
  } catch (err) {
    alert('cannot add to favorites')
  }
  
  
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
    const response = await request.request(options);
    console.log(response.data);
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

  const response = await request.request(options);
  console.log(response.data);

  return response.data;
};

export const updateTrail = async (trail) => {
  const response = await request.put(`${TRAILS_API}/${trail.id}`, trail);
  return response.data;
};