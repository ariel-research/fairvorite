import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white w-1/5 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">My App</h1>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/" className="block text-white hover:text-blue-400">
              Home
            </Link>
          </li>
          {/* Add more navigation links here */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
