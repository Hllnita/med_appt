import React, { useEffect, useState } from 'react';
import GiveReviews from '../GiveReviews/GiveReviews'; // import the form
import './ReviewForm.css';

function ReviewTable() {
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState({}); // For storing reviews
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Store selected doctor data for review form

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name)); // Use doctor's name as the key

    console.log('Stored Username:', storedUsername);
    console.log('Stored Doctor Data:', storedDoctorData);
    console.log('Stored Appointment Data:', storedAppointmentData);

    if (storedUsername) {
      console.log('User is logged in:', storedUsername); // Log the username
    }

    if (storedDoctorData) {
      console.log('Stored Doctor Data:', storedDoctorData);
    }

    if (storedAppointmentData) {
      // If the stored data is an array, use it as it is.
      // If it's a single object, wrap it in an array to handle both cases.
      const appointmentData = Array.isArray(storedAppointmentData) 
        ? storedAppointmentData 
        : [storedAppointmentData]; // Convert single object to array

      setAppointments(appointmentData); // Set the state with the appointment data
    } else {
      console.log('No appointment data found in localStorage.');
    }
  }, []); // Empty dependency array means it runs only once when the component mounts


  const handleFeedbackSubmit = (reviewData) => {
    const { review, rating, doctorData } = reviewData;
    setReviews((prevReviews) => {
      const newReviews = { ...prevReviews, [doctorData.name]: { review, rating } };
        console.log("newReviews",newReviews);
      return newReviews;
    });
    setSelectedDoctor(null); // Close the review form after submission

  };
  
  const handleReviewClick = (doctorData) => {
    setSelectedDoctor(doctorData); // Open the review form for the selected doctor
  };

  return (
    <div className="container">
      <h2>Appointment Reviews</h2>
      {appointments.length > 0 ? (
        <table border="1" style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Doctor</th>
              <th>Speciality</th>
              <th>Provide Feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appt.doctorName}</td>
                <td>{appt.doctorSpeciality}</td>
                {
                    // Check if the review exists and is not empty
                    reviews[appt.name]?.review?.trim() ? (
                        // Show the review if it's not empty
                        <td>
                            <button disabled onClick={() => handleReviewClick(appt)}>Click Here</button>
                        </td>
                    ) : (
                        <td>
                            <button onClick={() => handleReviewClick(appt)}>Click Here</button>
                        </td>
                    )
                }
                <td>{reviews[appt.name]?.review || 'No review yet'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found. Please book an appointment first.</p>
      )}

      {/* Show the GivenReview form when a doctor is selected */}
      {selectedDoctor && (
        <GiveReviews doctorData={selectedDoctor} onSubmitReview={handleFeedbackSubmit} />
      )}
    </div>
  );
}

export default ReviewTable;
