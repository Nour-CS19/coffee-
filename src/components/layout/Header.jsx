import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onChangePassword, onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="header">
      <div className="d-flex align-items-center gap-3">
        <button 
          className="btn btn-light sidebar-toggle" 
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <i className="bi bi-list"></i>
        </button>
        <h5 className="mb-0">Admin Panel</h5>
      </div>
      <div className="position-relative">
        <button 
          className="btn btn-light" 
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <i className="bi bi-person-circle"></i> {user?.email || 'Admin'}
        </button>
        {showDropdown && (
          <div className="dropdown-menu-custom">
            <button onClick={onChangePassword}>
              <i className="bi bi-key"></i> Change Password
            </button>
            <button onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;