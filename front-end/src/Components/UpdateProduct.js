import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddProduct.css"

const Updateproduct=()=>{
const [name,setName] = useState('');
const [price,setPrice] = useState('');
const [category,setCategory] = useState('');
const [company,setCompany] = useState('');
const params = useParams();
const navigate = useNavigate();

useEffect(()=>{
   getSingleProductDetails();
},[])

const getSingleProductDetails= async ()=>{
    console.warn(params,'lllllllparams aaagaya');
    let result = await fetch(`http://localhost:4000/singleProduct/${params.id}`,{
        headers:{
            authorization:JSON.parse(localStorage.getItem('token'))
        }
    });
    result = await result.json()
    console.warn(result,'complete details of the product');
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
}


const UpdateProduct = async () => {
console.warn(name,price,category,company);
let result = await fetch(`http://localhost:4000/updateProduct/${params.id}`,{
    method:"put",
    body:JSON.stringify({name,price,category,company}),
    headers:{
        'Content-Type':"Application/json",
        authorization:JSON.parse(localStorage.getItem('token'))

    }
});
result= await result.json();
console.warn(result);
if (result)
{
    navigate("/")
}

}
    return(
        <div className="signUp">
            <div className="login-page">
                <div className="form">
                    <h1>Update Product</h1>
                  
                    <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}} placeholder="Product-Name"  />
                     
                    <input type="text" value={price} onChange={(event)=>setPrice(event.target.value)} placeholder="Price"  />
                 
                    <input type="text" value={category} onChange={(event)=> setCategory(event.target.value)} placeholder="Category" />
                    
                    <input type="text" value={company} onChange={(event)=>setCompany(event.target.value)} placeholder="Company" />
                    
                    <button onClick={UpdateProduct} >Update</button>
                </div>
            </div>
        </div>
    )
   
}

export default Updateproduct;