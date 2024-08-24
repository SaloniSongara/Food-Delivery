import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/banner.jpg";

export default function LoginSignup() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    const validateEmail = (email) => {
        // Regex to check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        // Check if the phone number is exactly 10 digits
        return phone.length === 10 && !isNaN(phone);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/signin', { email, password });
            alert('Signed in successfully!');
            navigate("/home");
            console.log(response.data);
        } catch (error) {
            alert('Sign in failed!');
            console.error(error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const fullname = e.target.fullname.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmpassword = e.target.confirmpassword.value;

        if (!validatePhone(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password !== confirmpassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/signup', {
                fullname,
                phone,
                email,
                password,
            });
            setIsSuccess(true);
            setIsSignIn(false);
            alert('Signed up successfully!');
            console.log(response.data);
        } catch (error) {
            alert('Sign up failed!');
            console.error(error);
        }
    };

    const sectionStyle = {
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    return (
        <div style={sectionStyle}>
            <div className='login-form'>
                <div className="form-container">
                    <div className={`frame ${!isSignIn && !isSuccess ? 'frame-long' : ''} ${isSuccess ? 'frame-short' : ''}`}>
                        <div className={`nav ${isSuccess ? 'nav-up' : ''}`}>
                            <ul className="links">
                                <li className={isSignIn ? 'signin-active' : 'signin-inactive'}>
                                    <a href="#" className="btn" onClick={toggleForm}>Sign in</a>
                                </li>
                                <li className={!isSignIn ? 'signup-active' : 'signup-inactive'}>
                                    <a href="#" className="btn" onClick={toggleForm}>Sign up</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <form className={`form-signin ${!isSignIn ? 'form-signin-left' : ''}`} onSubmit={handleSignIn}>
                                <label htmlFor="email">Email</label>
                                <input className="form-styling" type="text" name="email" required />
                                <label htmlFor="password">Password</label>
                                <input className="form-styling" type="password" name="password" required />
                                <div className="btn-animate">
                                    <button type="submit" className="btn-signin">Sign in</button>
                                </div>
                            </form>

                            <form className={`form-signup ${isSignIn ? '' : 'form-signup-left'}`} onSubmit={handleSignUp}>
                                <label htmlFor="fullname">Full name</label>
                                <input className="form-styling" type="text" name="fullname" required />
                                <label htmlFor="phone">Phone</label>
                                <input className="form-styling" type="number" name="phone" required />
                                <label htmlFor="email">Email</label>
                                <input className="form-styling" type="email" name="email" required />
                                <label htmlFor="password">Password</label>
                                <input className="form-styling" type="password" name="password" required />
                                <label htmlFor="confirmpassword">Confirm password</label>
                                <input className="form-styling" type="password" name="confirmpassword" required />
                                <button type="submit" className="btn-signup">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
