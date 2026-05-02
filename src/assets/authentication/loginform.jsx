import React, { useState } from 'react';
import './loginform.css';
import { Link, useNavigate } from 'react-router-dom';

function Loginform() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("token", data.token);
                navigate('/');
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.log(error);
            alert("Server error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Admin login successful!");
                localStorage.setItem("token", data.token);
                navigate('/');
            } else {
                alert(data.message || "Invalid admin credentials");
            }
        } catch (error) {
            console.log(error);
            alert("Server error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="main-login-form">
            <div className="login-bg-shapes">
                <div className="login-shape shape-a"></div>
                <div className="login-shape shape-b"></div>
                <div className="login-shape shape-c"></div>
            </div>
            <div className="login-form-wrapper">
                <div className="login-form-card">
                    <div className="login-header">
                        <div className="login-icon">
                            <i className="fas fa-user-graduate"></i>
                        </div>
                        <h2>Welcome Back</h2>
                        <p>Sign in to continue your learning journey</p>
                    </div>

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="input-group">
                            <label><i className="fas fa-envelope"></i> Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label><i className="fas fa-lock"></i> Password</label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="login-buttons">
                            <button type="submit" className="btn-student" disabled={isLoading}>
                                {isLoading ? (
                                    <><div className="btn-spinner"></div> Signing in...</>
                                ) : (
                                    <><i className="fas fa-sign-in-alt"></i> Login as Student</>
                                )}
                            </button>
                            <button type="button" className="btn-admin" onClick={handleAdminLogin} disabled={isLoading}>
                                <i className="fas fa-shield-alt"></i> Login as Admin
                            </button>
                        </div>
                    </form>

                    <div className="login-footer">
                        <p>Don't have an account?</p>
                        <Link to="/login/signup">
                            <button className="btn-signup">
                                <i className="fas fa-user-plus"></i> Create Account
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loginform;

