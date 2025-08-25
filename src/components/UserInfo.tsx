"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const UserInfo = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userAvatar = null; // Replace with actual avatar URL or null if missing

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="nt-component nt-user-info flex items-center space-x-4">
      <div className="nt-user-avatar w-10 h-10" onClick={toggleDropdown}>
        {userAvatar ? (
          <Image src={userAvatar} alt="User Avatar" width={40} height={40} className="nt-avatar-image rounded-full" />
        ) : (
          <div className="nt-avatar-icon rounded-full bg-gray-200 flex items-center justify-center">👤</div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">John Doe</p>
        <p className="text-xs text-gray-500">johndoe@example.com</p>
      </div>
      {dropdownOpen && (
        <div className="nt-user-dropdown absolute bg-white shadow-md rounded-md mt-2">
          <p className="nt-user-name px-4 py-2 text-sm font-medium text-gray-800">John Doe</p>
          <p className="nt-user-email px-4 py-2 text-xs text-gray-500">john.doe@example.com</p>
          <button className="nt-notifications block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notifications</button>
          <button className="nt-settings block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</button>
          <button className="nt-logout block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
