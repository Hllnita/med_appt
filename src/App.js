// Import necessary modules from React library
// import React, { useEffect } from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/LandingPage/LandingPage';
import SignUp from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import BookingConsultation from './Components/BookingConsultation';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';  
import Notification from './Components/Notification/Notification';

// Function component for the main App
function App() {

  // Render the main App component
  return (
    <div className="App">
        <BrowserRouter>
            <Notification>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/login" element={<Login/>}/>

                    <Route path="/booking-consultation" element={<BookingConsultation/>}/>
                    <Route path="/instant-consultation" element={<InstantConsultation />} />

                    <Route path="/notification" element={<component_name/>}/> //Replace the component_route with the component path and component_name with the component name as imported in the App.js file.                    
                </Routes>
          </Notification>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;