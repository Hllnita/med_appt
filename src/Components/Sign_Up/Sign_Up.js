// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const SignUp = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState([]); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            const errors = {}; // Object to store errors for each field
            if (json.errors && Array.isArray(json.errors)) {
                console.log("Errors:", json.errors);
                json.errors.forEach(error => {
                    if (error.param && error.msg) {
                        errors[error.param] = error.msg;
                    } else {
                        console.warn("Error object missing 'param' or 'msg':", error);
                        // Optionally handle errors without 'param'
                    }
                });
            } else if (json.error) {
                console.log("Single Error:", json.error);
                const errors = {};
                
                if (json.error["0"] && typeof json.error["0"] === 'object') {
                    const singleErrorDetail = json.error["0"];
                    if (singleErrorDetail.param && singleErrorDetail.msg) {
                        errors[singleErrorDetail.param] = singleErrorDetail.msg;
                    } else if (typeof json.error === 'string') {
                        errors['general'] = json.error;
                    }
                } else if (typeof json.error === 'string') {
                    errors['general'] = json.error;
                }
                setShowerr(errors); // Update the state with the errors object
            }
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{marginTop:'5%'}}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="signup-grid-none">
                            <div className="signup-text"> 
                                <h1 style={{textAlign: "left"}}>Sign Up</h1>
                            </div>
                            <div className="signup-text1" style={{textAlign: "left"}}> 
                                Already a member? <span><a href="/login" style={{color: "#2190FF"}}> Login</a></span>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                                {showerr.name && <div className="err" style={{ color: 'red' }}>{showerr.name}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
                                {showerr.phone && <div className="err" style={{ color: 'red' }}>{showerr.phone}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                                {showerr.email && <div className="err" style={{ color: 'red' }}>{showerr.email}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
                                {showerr.password && <div className="err" style={{ color: 'red' }}>{showerr.password}</div>}
                            </div>
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                                Sign up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;