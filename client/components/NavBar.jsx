import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <nav className="navbar navbar-expand">
                <div className="container">
                <a href="index.html" className="navbar-brand display-2">VYBE</a>
                <ul className="navbar-nav">
                    {/* <li className="nav-item">
                    <a onClick={() => navigate('/login-signup')} className="nav-link btn">Home</a>
                    </li> */}
                    <li className="nav-item">
                    <a onClick={() => navigate('/user')} className="nav-link btn">My Page</a>
                    </li>
                    <li className="nav-item">
                    <a onClick={() => navigate('/search')} className="nav-link btn">Search</a>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    )

}

export default NavBar;