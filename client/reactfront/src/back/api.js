import axios from 'axios';
const API = axios.create({
    baseURL: 'https://mern-app-4mhj.onrender.com/api'
});


// Fetching all users
export const fetchUsers =()=> API.get('/users');
export const addUsers =(user)=> API.post('/users', user);
export const deleteUser =(id)=> API.delete(`/users/${id}`);
