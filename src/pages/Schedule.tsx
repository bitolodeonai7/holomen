import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import axios from 'axios';

function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch available time slots
    axios.get(`/api/timeslots?date=${format(selectedDate, 'yyyy-MM-dd')}`)
      .then(response => setTimeSlots(response.data))
      .catch(error => console.error("Error fetching time slots:", error));

    // Fetch user's bookings
    axios.get('/api/bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error("Error fetching bookings:", error));
  }, [selectedDate]);

  const handleDateChange = (days) => {
    setSelectedDate(addDays(selectedDate, days));
  };

  const handleBooking = (timeSlot) => {
    axios.post('/api/bookings', { date: selectedDate, timeSlot })
      .then(response => {
        setBookings([...bookings, response.data]);
        // Update available time slots
        setTimeSlots(timeSlots.filter(slot => slot !== timeSlot));
      })
      .catch(error => console.error("Error creating booking:", error));
  };

  return (
    <div className="max-w-4xl mx-auto glassmorphic p-6">
      <h2 className="text-2xl font-bold mb-4 neon-text">Schedule</h2>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => handleDateChange(-1)} className="px-4 py-2 bg-neon-blue bg-opacity-20 rounded hover:bg-opacity-30 transition">Previous Day</button>
        <h3 className="text-xl">{format(selectedDate, 'MMMM d, yyyy')}</h3>
        <button onClick={() => handleDateChange(1)} className="px-4 py-2 bg-neon-blue bg-opacity-20 rounded hover:bg-opacity-30 transition">Next Day</button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {timeSlots.map(slot => (
          <button
            key={slot}
            onClick={() => handleBooking(slot)}
            className="px-4 py-2 bg-neon-purple bg-opacity-20 rounded hover:bg-opacity-30 transition"
          >
            {slot}
          </button>
        ))}
      </div>
      <h3 className="text-xl mt-8 mb-4 neon-text">Your Bookings</h3>
      <ul className="space-y-2">
        {bookings.map(booking => (
          <li key={booking.id} className="p-2 bg-gray-800 bg-opacity-50 rounded">
            {format(new Date(booking.date), 'MMMM d, yyyy')} at {booking.timeSlot}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;