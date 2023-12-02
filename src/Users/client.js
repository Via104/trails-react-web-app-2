import axios from "axios";
// export const USERS_API = process.env.REACT_APP_API_URL;
export const USERS_API = "http://localhost:4000/api/users";

export const signin = async (user) => {
  const response = await axios.post(`${USERS_API}/signin`, user);
  console.log(response.data);
  return response.data;
};

export const account = async () => {
  const response = await axios.post(`${USERS_API}/account`);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await axios.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const users = async () => {
  const response = await axios.get(`${USERS_API}`);
  console.log("here");
  return response.data;
};

export const deleteUser = async (user) => {
  const response = await axios.delete(`${USERS_API}/${user._id}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

export const signup = async (user) => {
  const response = await axios.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const signout = async () => {
  const response = await axios.post(`${USERS_API}/signout`);
  return response.data;
};

export const findUsersByRole = async (role) => {
  const response = await axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findFavouritesByUserId = async (id) => {
  const response = await axios.get(`${USERS_API}/${id}/favourites`);
  return response.data;
};

export const addToFavourites = async (id) => {
  const response = await axios.put(`${USERS_API}/${id}/favourites`);
  return response.data;
};

export const findAllTrails = async () => {
  const options = {
    method: "GET",
    url: "https://trailapi-trailapi.p.rapidapi.com/trails/%7Bid%7D/maps/",
    headers: {
      "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
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
