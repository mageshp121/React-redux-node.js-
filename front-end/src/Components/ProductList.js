import React, { useEffect, useState } from "react";
import './ProductList.css'
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";
import CartButons from "./Buttons";

const ProductLIst = () => {
    const { cartList } = useSelector((state) => state.cart)
    console.log(cartList,'/cart list');
    
    



    const [products, setProducts] = useState([]);
    useEffect(() => {
        getAllProducts();
    }, [])



    const getAllProducts = async () => {
        let result = await fetch("http://localhost:4000/products", {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        // let item=localStorage.getItem()
        // console.warn(item);
        console.warn(result, '//////////////////////');
        setProducts(result)

    }



    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:4000/delete-product/${id}`, {
            method: "Delete",
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        if (result) {
            getAllProducts();
        }

    }



    const searchProduct = async (event) => {
        console.warn(event.target.value);
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http:///localhost:4000/searchproduct/${key}`, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getAllProducts();
        }

    }







    return (
        <div>
            <input className="search-product" onChange={searchProduct} type="" placeholder="Search" />
            <table className="rwd-table">
                <tr>
                    <th>Sl.NO</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Manage</th>
                </tr>
                {products.length > 0 ? products.map((item,index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>{item.company}</td>
                        <td>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}><button>update</button></Link>
                        </td>
                        <td>
                           <CartButons item={item} />
                        </td>
                    </tr>
                ) : <h1 className="alert">sorry result not found</h1>
                }
            </table>



        </div>
    )
}
export default ProductLIst;