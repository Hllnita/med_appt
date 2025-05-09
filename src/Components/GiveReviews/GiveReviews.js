// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './GivenReviews.css';

// Function component for giving reviews
function GiveReviews({ doctorData, onSubmitReview }) {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  // Function to handle button click event
  const handleButtonClick = () => {
    setShowForm(true);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled before submission
    if (formData.name && formData.review && formData.rating > 0) {
      // If valid, submit the review data
      setSubmittedMessage('Thank you for your review!');
      onSubmitReview({ ...formData, doctorData });

      // Reset the form data
      setFormData({
        name: '',
        review: '',
        rating: 0
      });

      // Hide the warning message
      setShowWarning(false);
    } else {
      // If any field is missing, show the warning
      setShowWarning(true);
    }
  };

  return (
    <div className="given-review-form">
      {!showForm ? (
        <span className="feedback-link" onClick={handleButtonClick}>Click Here</span>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Give Your Feedback for {doctorData?.doctor}</h3>
          {submittedMessage && <p className="submitted-message">{submittedMessage}</p>}
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <div>
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Your name" 
            />
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea 
              name="review" 
              value={formData.review} 
              onChange={handleChange} 
              placeholder="Write your review here"
            />
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <select name="rating" value={formData.rating} onChange={handleChange}>
                <option value="0">-- Select Rating --</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>
          </div>

          <button type="submit">Submit Review</button>
        </form>
      )}
    </div>
  );
}

export default GiveReviews;
