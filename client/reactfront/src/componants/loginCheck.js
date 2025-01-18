import React ,{useState} from 'react';

import axios from 'axios';
import { useNavigate } from'react-router-dom';

const Login = ()=>

{
    const navigate = useNavigate();

const [error, setError] = useState('');
const [username,setUsername] = useState('');
const [password,setPassword] = useState('');
const [token,setToken] = useState('');
const [userData,setUserDate]= useState(null);

const LoginHandler= async (e)=>{
    e.preventDefault();
    try{
        const res = await axios.post('https://mern-app-4mhj.onrender.com/api/login',{username,password});
        setToken(res.data.token);
        console.log(res.data.token);
        alert('login done');
        //  navigate to home page
        navigate('/');
        // store token in local storag or session storage
        sessionStorage.setItem('jwt',res.data.token);



    }catch(error){
        console.log(error.response.data);
        alert('invaled username or password');
    }

}


return(
    <>
    <h1>hi to login</h1>
    <form onSubmit={LoginHandler}>
        <input type="text" placeholder='Username' value={username} onChange={
            (e)=>{setUsername(e.target.value)}} required/>
        <input type="text" placeholder='Password' value={password} onChange={(e)=>{
            setPassword(e.target.value)}} required/>

        <button type='submit'>login</button>
    </form>
    </>
)

}


export default Login;
