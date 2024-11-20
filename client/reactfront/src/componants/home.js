import React, { useEffect, useState } from 'react';
import { addUsers, fetchUsers } from '../back/api';

export default  function Home(){
   const [users, setUsers] = useState([]);
   useEffect(()=>{
    // alert('fetching users');

    getUSers()
   },[])
   const getUSers = async ()=>{
    const res = await fetchUsers();
    setUsers(res.data);

}
   const addUserHandler = async (e)=>{
    const user ={
        username: "New dddffffffddUser",
        phone: "1234567890",
        password: "password123"
    }
    const res = await addUsers(user);
    console.log(res.data);
    getUSers()
   }
   console.log(users);
    return (
        <div>
            <h1>Welcome to my React App!</h1>
            <button onClick={addUserHandler}>add user</button>
            {
                
                <ul>
                    {users.map((user)=>(
                        <li key={user._id}>{user.username}</li>
                    ))}
                </ul>
            }
        </div>
    )
}
