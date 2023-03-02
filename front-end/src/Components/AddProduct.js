import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css"



const Addproduct=()=>{

const [name,setName] = useState('');
const [price,setPrice] = useState('');
const [category,setCategory] = useState('');
const [company,setCompany] = useState('');
const [error,setError] = useState(false);
const navigate = useNavigate();
const AddProduct = async () => {
    if(!name || !price || !company || !category){
        setError(true)
        return false
    }


      console.warn(name,price,category,company,'....................');
      const userId = JSON.parse(localStorage.getItem('user'))._id;
      console.warn(userId,'///////////////////');
      let result = await fetch("http://localhost:4000/add-product",{
        method:"post",
        body:JSON.stringify({name,price,category,company,userId}),
        headers:{
            'Content-type':"application/json",
            authorization:JSON.parse(localStorage.getItem('token'))
        }
      });
       
      result = await result.json()
      console.warn(result);
      navigate("/")

}
    return(
        <div className="signUp">
            <div className="login-page">
                <div className="form">
                    <h1>ADD-PRODUCT</h1>
                    <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}} placeholder="Product-Name"  />
                     {error && !name && <spane className="error">Enter valied name</spane> }
                    <input type="text" value={price} onChange={(event)=>setPrice(event.target.value)} placeholder="Price"  />
                    {error && !price && <spane className="error">Enter valied Price</spane> }
                    <input type="text" value={category} onChange={(event)=> setCategory(event.target.value)} placeholder="Category" />
                    {error && !category && <spane className="error">Enter valied category</spane> }
                    <input type="text" value={company} onChange={(event)=>setCompany(event.target.value)} placeholder="Company" />
                    {error && !company && <spane className="error">Enter valied company</spane> }
                    <button onClick={AddProduct} >ADD</button>
                </div>
            </div>
        </div>
    )
}
export default Addproduct;