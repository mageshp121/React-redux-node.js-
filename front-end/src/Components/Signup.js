import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../Components/Signup.css'

const SignUp = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate()
    
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        console.warn(auth);
        if(auth){
            navigate("/")
        }

   },[])



    const signupData = async ()=>{
        console.warn(name,email,password);
        let result = await fetch("http://localhost:4000/register",{
         method:"post",
         body:JSON.stringify({name,email,password}),
         headers:{
           'content-type':"application/json"
         }
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))
        navigate("/")
        
    }   

    return (
        <div className="signUp">
            <div className="login-page">
                <div className="form">
                    <h1>Register</h1>
                    <input type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}  />
                    <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}  />
                    <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}  />
                    <button onClick={signupData}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}
export default SignUp;