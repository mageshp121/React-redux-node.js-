import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
const Login = () =>{
   
    const [email,setEmail]=useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
        const auth=localStorage.getItem("user")
        if(auth){
            navigate("/")
        }
    },[])


    const handlLogin  = async () => {
    //  console.warn(email,password);
     let result = await fetch("http://localhost:4000/login",{
        method:"post",
        body:JSON.stringify({email,password}),
        headers:{
            'Content-type':"application/json"
          }
     });

     result = await result.json();
     console.warn(result);
     console.log(result.name);
     if(result.auth){
     localStorage.setItem("user",JSON.stringify(result.userData))
     localStorage.setItem("token",JSON.stringify(result.auth))
     navigate('/')
     }else{
        alert("Please enter correct details")
     }
    }
    return(

        <div className="signUp">
            <div className="login-page">
                <div className="form">
                    <h1>Login</h1>
                    <input type="email" placeholder="Email" required value={email} onChange={(event)=>{setEmail(event.target.value)}} />
                    <input type="text"  placeholder="Password" required value={password} onChange={(event)=>{setPassword(event.target.value)}} />
                    <button onClick={handlLogin} >Login</button>
                </div>
            </div>
        </div>
    )
}
export default Login;