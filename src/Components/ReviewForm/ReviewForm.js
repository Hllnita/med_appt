import React, { useState } from 'react';
import GiveReviews from '../GiveReviews/GiveReviews'; // import the form
import './ReviewForm.css';


function ReviewTable() {
  const doctors = [
    { id: 1, name: "Dr. A", speciality: "Cardiologist" },
    { id: 2, name: "Dr. B", speciality: "Neurologist" }
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleClick = (doc) => {
    setSelectedDoctor(doc);
    setShowModal(true);
  };

  return (
    <>
      <table className="review-table container">
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
          {doctors.map((doc, index) => (
            <tr key={doc.id}>
              <td>{index + 1}</td>
              <td>{doc.name}</td>
              <td>{doc.speciality}</td>
              <td>
                <span className="feedback-link" onClick={() => handleClick(doc)}>Click Here</span>
              </td>
              <td>--</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={() => setShowModal(false)}>X</button>
            <h2>Feedback for {selectedDoctor?.name}</h2>
            <GiveReviews />
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewTable;
