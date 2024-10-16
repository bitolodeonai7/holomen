import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CreditCard, User, Home } from 'lucide-react';

function Header() {
  return (
    <header className="p-4 glassmorphic">
      <nav className="flex justify-between items-center">
        <h1 className="text-3xl font-bold neon-text">Holomen</h1>
        <div className="flex space-x-4">
          <Link to="/" className="flex items-center px-4 py-2 bg-neon-blue bg-opacity-20 rounded-full hover:bg-opacity-30 transition">
            <Home className="mr-2" /> Home
          </Link>
          <Link to="/schedule" className="flex items-center px-4 py-2 bg-neon-purple bg-opacity-20 rounded-full hover:bg-opacity-30 transition">
            <Calendar className="mr-2" /> Schedule
          </Link>
          <Link to="/payment" className="flex items-center px-4 py-2 bg-neon-blue bg-opacity-20 rounded-full hover:bg-opacity-30 transition">
            <CreditCard className="mr-2" /> Payment
          </Link>
          <Link to="/profile" className="flex items-center px-4 py-2 bg-neon-purple bg-opacity-20 rounded-full hover:bg-opacity-30 transition">
            <User className="mr-2" /> Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;