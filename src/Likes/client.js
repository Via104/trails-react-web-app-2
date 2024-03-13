import axios from "axios";

const request = axios.create({
  withCredentials: true,
});
const API_BASE = process.env.REACT_APP_API_BASE;
const BASE_API = `${API_BASE}/likes`;

export const createUserLikesTrail = async (userId, trail) => {
  const response = await request.post(
    `${BASE_API}/users/${userId}/trails`,
    trail
  );
  console.log("creating trail like")
  console.log(response.data)
  return response.data;
};

export const deleteUserLikesTrail = async (userId, trailId) => {
  const response = await request.delete(
    `${BASE_API}/users/${userId}/trails/${trailId}`
  );
  return response.data;
};

export const findUsersOfLikedTrail = async (trailId) => {
  const response = await request.get(
    `${BASE_API}/trails/${trailId}/users`
  );
  return response.data;
};

export const findTrailsLikedByUser = async (userId) => {
  const response = await request.get(
    `${BASE_API}/users/${userId}/trails`
  );
  return response.data;
};

export const findLikedTrails = async () => {
  const response = await request.get(
    `${BASE_API}`
  );
  return response.data;
};