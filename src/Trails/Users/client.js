import axios from "axios";
import * as LikesClient from "../Likes/client"
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

export const addToFavorites = async (user, trail) => {
  if(user.favorites && user.favorites.filter((fav) => fav.id === Number(trail.id)).length === 0) {
    const favs = [...user.favorites, trail];
    try { 
      console.log(user)
      console.log(trail)
      const response = await request.put(
        `${USERS_API}/favorites/${user._id}/`,
        {user: user, favs: favs}
      );
      await LikesClient.createUserLikesTrail(trail.id, trail.name, trail.description)
      return response.data;
    } catch (err) {
      console.log(err)
      alert('cannot add to favorites')
    }
  }else {
    alert('already in favs')
    console.log(`favs length: ${user.favorites.length}`)
    return user
  } 
};

export const removeFromFavorites = async (user, trail) => {
  try{ 
    console.log("in removeFromFavorites")
    console.log(user)
    console.log(trail)
    if (user.favorites) {
      const favs = user.favorites.filter((fav) => fav.id !== Number(trail.id));
      const response = await request.put(
        `${USERS_API}/favorites/${user._id}/`,
        {user: user, favs: favs}
      );
      LikesClient.deleteUserLikesTrail(trail.id)
      return response.data;
    }
    return user
  } catch (err) {
    console.log(err)
    alert('cannot remove from favorites')
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