import axios from 'axios';
const URL= '/api/users'
//get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
//get user by email
export const getUserByMail = async (email) => {
  try {
    const response = await axios.get(`${URL}/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
//add new user
export const addUser = async (user) => {
  try {
    const response = await axios.post(`${URL}/register`, user);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};
//update user by email
export const updateUser = async (email, user) => {
  try {
    const response = await axios.put(`${URL}/update/${email}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export default {
    getUsers,
    getUserByMail,
    addUser,
    updateUser
};
