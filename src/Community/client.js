import axios from "axios";

const request = axios.create({
  withCredentials: true,
});


// export const USERS_API = process.env.REACT_APP_API_URL;
export const USERS_API = "http://localhost:4000/api/users";
export const TRAILS_API = "http://localhost:4000/api/trails";
export const BASE_API = "http://localhost:4000/api/likedTrails";


// get all users who favored this trail
export const findLikedTrails = async () => {
  const response = await request.get(`${BASE_API}`);
  return response.data;
};

// update list of users associated with this trail
export const addLikedUser = async (trailId, trail) => { 
  console.log('IN addLikedUser')
  console.log(trail)
  const response = await request.put(`${BASE_API}/${trailId}/users/add`, {trail: trail});
  return response.data;
};

export const removeLikedUser = async (trailId) => {
  const response = await request.put(`${BASE_API}/${trailId}/users/remove`);
  return response.data;
};

// export const removeLikedUser = async (trailId) => {
//   await createTrail(trail, userId); // first create trail in db (with the current user id)
//   const userIds = await getFavUsers(trail.id); // get list of users associated with the given trail
//   const newUsers = [...userIds, userId]; // update users list
//   const response = await axios.put(`${TRAILS_API}/${trailId}/users/add`);
//   return response.data;
// };
// update a trail info in trails collection
// export const updateTrail = async (trail) => {
//   const response = await axios.put(`${TRAILS_API}/${trail.id}`, trail);
//   return response.data;
// };

// // update a trail in user's favourites
// export const updateTrailUser = async (userId, trail) => {
//   const response = await axios.put(`${USERS_API}/${userId}/${trail.id}`, trail);
//   return response.data;
// };

