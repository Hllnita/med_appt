import React, {  useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    // const [selectedSlot, setSelectedSlot] = useState(null);
  
    const timeSlots = [
        '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
        '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
      ];
    

    const handleChange = (e) => {
        setSelectedTime(e.target.value);
    };

    // const handleSlotSelection = (slot) => {
    //   setSelectedSlot(slot);
    // };
  
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const doctorData = {
            name: doctorName,
            speciality: doctorSpeciality,
        };
        const appointmentDetails = {
            name,
            phoneNumber,
            selectedDate: selectedDate?.toLocaleDateString(),
            selectedTime,
            doctorName,
            doctorSpeciality,
        };

        // ✅ Store doctor data
        localStorage.setItem('doctorData', JSON.stringify(doctorData));

        // Save appointment to localStorage using doctor's name as key
        if (doctorName) {
            localStorage.setItem(doctorName, JSON.stringify(appointmentDetails));
        }

        // Call the parent component's onSubmit handler
        onSubmit(appointmentDetails);

        // Reset form
        setName('');
        setPhoneNumber('');
        setSelectedDate(null);
        setSelectedTime('');
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
         <div className="form-group" style={{ marginBottom: 20 }}>
            <label>Date of Appointment: </label>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                placeholderText="Click to select a date"
            />
        </div>

        <div className="form-group" style={{ marginBottom: 20 }}>
            <label htmlFor="time-slot">Book Time Slot: </label>
            <select id="time-slot" value={selectedTime} onChange={handleChange}>
                <option value="" disabled>Select a time slot</option>
                {timeSlots.map((slot, index) => (
                <option key={index} value={slot}>
                    {slot}
                </option>
                ))}
            </select>

            {selectedTime && <p>You selected: <strong>{selectedTime}</strong></p>}
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm
