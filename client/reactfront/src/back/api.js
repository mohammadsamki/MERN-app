import axios from 'axios';
const API = axios.create({
    baseURL: 'http://127.0.0.1:5001/api'
});


// Fetching all users
export const fetchUsers =()=> API.get('/users');
export const addUsers =(user)=> API.post('/users', user);
export const deleteUser =(id)=> API.delete(`/users/${id}`);
