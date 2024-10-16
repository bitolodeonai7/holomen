import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile
    axios.get('/api/profile')
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user profile:", error));
  }, []);

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto glassmorphic p-6">
      <h2 className="text-2xl font-bold mb-4 neon-text">User Profile</h2>
      <div className="bg-gray-800 bg-opacity-50 p-4 rounded mb-6">
        <p><strong>Name:</strong> <span className="text-neon-blue">{user.name}</span></p>
        <p><strong>Email:</strong> <span className="text-neon-purple">{user.email}</span></p>
        <p><strong>Wallet Balance:</strong> <span className="text-neon-blue">${user.walletBalance.toFixed(2)}</span></p>
      </div>
      <h3 className="text-xl font-bold mt-8 mb-4 neon-text">Booking History</h3>
      <ul className="space-y-2">
        {user.bookings.map(booking => (
          <li key={booking.id} className="bg-gray-800 bg-opacity-50 p-2 rounded">
            <p><strong>Date:</strong> <span className="text-neon-blue">{new Date(booking.date).toLocaleDateString()}</span></p>
            <p><strong>Time:</strong> <span className="text-neon-purple">{booking.timeSlot}</span></p>
            <p><strong>Location:</strong> <span className="text-neon-blue">{booking.location}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;