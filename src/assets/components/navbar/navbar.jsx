import React, { useState } from 'react';
import './navbar.css';
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = localStorage.getItem('token');
    const userData = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const isAdmin = userData && userData.role === 'admin';
    const logout = () => {
      localStorage.removeItem('token');
      window.location.href = '/';
    };
    
    function adminClick() {
        console.log("Welcome to Admin Dashboard");
    }

    function homeClick() {
        console.log("Welcome to Home Page");
    }
     function aboutClick() {
        console.log("Welcome to About Page");
    }
     function coursesClick() {
        console.log("Welcome to Courses Page");
    }
     function contactClick() {
        console.log("Welcome to Contact Page");
    }
     function profileClick() {
        console.log("Welcome to Profile Page");
    }


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


    return(<>
    <div className="navbar">
        <div className="logo">
            <div className="logo-image">
                <img src="https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D" height="4vw" width="4vw" alt="Logo" />
            </div>
            <div className="logo-text">
                <h2>EduTech</h2>
            </div>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}><ul>
           <li id="home" onClick={homeClick}><Link to="/"><h1>Home</h1></Link></li>
            <li id="about" onClick={aboutClick}><Link to="/about"><h1>About</h1></Link></li>
            <li id="courses" onClick={coursesClick}><Link to="/courses"><h1>Courses</h1></Link></li>
            <li id="contact" onClick={contactClick}><Link to="/contact"><h1>Contact</h1></Link></li>



<li id="profile" onClick={profileClick}>
      <Link to={token ? "/profile" : "/login"}><h1><CgProfile size={30} color="white"/></h1></Link>
    </li>



            </ul>
            
        </div>
        <div className="menubar" >
                <IoMenu size={30} onClick={toggleMenu} color="white"/>

            </div>
    </div>
    </>)
}
export default Navbar;