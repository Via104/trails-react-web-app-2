import axios from "axios";

const request = axios.create({
  withCredentials: true,
});
const API_BASE = process.env.REACT_APP_API_BASE;
const BASE_API = `${API_BASE}/likes`;

export const createUserLikesTrail = async (trailId, title, description) => {
  const response = await request.post(
    `${BASE_API}/user/trail/${trailId}`,
    {title: title, description, description}
  );
  console.log("creating trail like")
  console.log(response.data)
  return response.data;
};

export const deleteUserLikesTrail = async (trailId) => {
  const response = await request.delete(
    `${BASE_API}/trail/${trailId}`
  );
  return response.data;
};

export const findUsersLikedTrail = async (trailId) => {
  const response = await request.get(
    `${BASE_API}/trails/${trailId}`
  );
  return response.data;
};

export const findTrailsLikedByUser = async (userId) => {
  const response = await request.get(
    `${BASE_API}/user/${userId}`
  );
  return response.data;
};

export const findLikedTrails = async () => {
  const response = await request.get(
    `${BASE_API}`
  );
  return response.data;
};