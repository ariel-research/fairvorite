import React from 'react';
import MenuItems,{APP_NAME} from './MenuItems'; // Import your menu items

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container flex justify-between items-center">
        <div>
          <img src="/fairvlogo.png" className="h-10 mx-auto flex" alt="image" />
            <a href="/" className="text-white text-2xl font-bold">
              {APP_NAME}
            </a>
        </div>
        <ul className="flex space-x-4">
        {MenuItems.map((menuItem) => (

            <li className="mb-4" key={menuItem.link}>
            <a href={menuItem.link} className="block text-white hover:text-blue-400">
            {menuItem.label}
            </a>
            </li>
        ))}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
