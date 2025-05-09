import React, { useState, useEffect } from "react"; // Importing the necessary modules from React library
import { Link, useNavigate } from "react-router-dom"; // Importing the Link component from react-router-dom library
import "./Navbar.css"; // Importing the CSS styles for the Landing_Page component


const Navbar = () => {
    const [username, setUsername] = useState(sessionStorage.getItem('name') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    // const[email,setEmail]=useState("");

    const navigate = useNavigate();

    useEffect(() => {
      const storeName= sessionStorage.getItem("name");
      if (storeName) {
        setIsLoggedIn(true);
        setUsername(storeName);
      }
      const handleStorageChange = () => {
        setUsername(sessionStorage.getItem("name") || "");
      };

      window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
      };

    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('email');
        setUsername(''); // Clear the username in the state
        // Optionally, redirect the user to the login page
        navigate('/login');
        setIsLoggedIn(false);
    };

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                StayHealthy 
                <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{fill:"#3685fb"}}>
                    <title>Doctor With Stethoscope SVG icon</title>
                    <g>
                        <g>
                            <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                            <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
                            <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44...."></path>
                        </g>
                    </g>
                </svg>
                </Link>
                <span>.</span>
            </div>
            <div className="nav__icon" >
                <i className="fa fa-times fa fa-bars"></i>
            </div>
            <ul className="nav__links active">
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
                <li className="link">
                    <Link to="/booking-consultation">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/reviews">Reviews</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className="link" style={{ position: "relative" }}>
                        <span onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: "pointer" }}>Welcome, {username}</span>
                        {showDropdown && (
                            <div className="dropdown-menu" style={{
                                position: "absolute",
                                right: 0,
                                background: "white",
                                color: "black",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px"
                            }}>
                                <Link to="/profile">Your Profile</Link>
                                <Link to="/reports">Your Report</Link>
                            </div>
                        )}
                        </li>
                        <li className="link">
                        <button className="btn2" onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                    ) : (
                    <>
                        <li className="link">
                        <Link to="/signup"><button className="btn1">Sign Up</button></Link>
                        </li>
                        <li className="link">
                        <Link to="/login"><button className="btn1">Login</button></Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;