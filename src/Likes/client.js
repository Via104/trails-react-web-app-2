import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

export const createUserLikesTrail = async (trailId, title, description) => {
  const response = await request.post(
    `http://localhost:4000/api/users/likes/${trailId}`,
    {title: title, description, description}
  );
  console.log("creating trail like")
  console.log(response.data)
  return response.data;
};

export const deleteUserLikesTrail = async (trailId) => {
  const response = await request.delete(
    `http://localhost:4000/api/users/likes/${trailId}`
  );
  return response.data;
};

export const findUsersLikedTrail = async (trailId) => {
  const response = await request.get(
    `http://localhost:4000/api/trails/${trailId}/likes`
  );
  return response.data;
};

export const findTrailsLikedByUser = async (userId) => {
  const response = await request.get(
    `http://localhost:4000/api/users/${userId}/likes`
  );
  return response.data;
};

export const findLikedTrails = async () => {
  const response = await request.get(
    `http://localhost:4000/api/likes`
  );
  return response.data;
};