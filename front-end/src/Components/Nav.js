import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Nav.css'

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup")
    }
    return (
        <div>
            <nav>


                {

                    auth ?
                        <ul className="first-nav">
                            <li><p className="nav-right">welcome  {JSON.parse(auth).name}</p></li>
                            <li><Link to="/">Products</Link></li>
                            <li><Link to="/add">Add Products</Link></li>
                            <li><Link to="/update">updateProducts</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link onClick={logout} to="/login">Logout</Link></li>
                            
                        </ul>
                        :
                        <ul className="nav-right">
                            <li><Link to="/signup">SignUp</Link></li>
                            <li><Link to="/login">Login</Link></li>

                        </ul>
                }

            </nav>
        </div>
    )
}
export default Nav;