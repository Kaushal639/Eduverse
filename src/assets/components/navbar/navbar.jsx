import React, { useState, useEffect } from 'react';
import './navbar.css';
import { IoMenu, IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navLinks = [
        { id: 'home', label: 'Home', path: '/' },
        { id: 'about', label: 'About', path: '/about' },
        { id: 'courses', label: 'Courses', path: '/courses' },
        { id: 'contact', label: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">
                <div className="logo-image">
                    <img src="https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0" alt="Logo" />
                </div>
                <div className="logo-text">
<h2>EduVerse</h2>
                    <span className="logo-tagline">Learn. Grow. Succeed.</span>
                </div>
            </div>

            <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id} onClick={closeMenu}>
                            <Link to={link.path}>
                                <span className="nav-label">{link.label}</span>
                            </Link>
                        </li>
                    ))}
                    <li className="profile-li" onClick={closeMenu}>
                        <Link to={token ? "/profile" : "/login"} className="profile-link">
                            <CgProfile size={26} />
                            <span className="nav-label">{token ? 'Profile' : 'Login'}</span>
                        </Link>
                    </li>
                    {token && (
                        <li className="logout-li">
                            <button onClick={logout} className="nav-logout-btn">
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            <div className="menubar">
                {isMenuOpen ? (
                    <IoClose size={30} onClick={toggleMenu} className="menu-icon" />
                ) : (
                    <IoMenu size={30} onClick={toggleMenu} className="menu-icon" />
                )}
            </div>
        </nav>
    );
}

export default Navbar;
