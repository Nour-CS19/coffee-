import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: 'speedometer2', label: 'Dashboard' },
    { path: '/categories', icon: 'grid-3x3', label: 'Categories' },
    { path: '/items', icon: 'cup-hot', label: 'Items' }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h4 className="text-white mb-0">☕ Café Admin</h4>
        {isMobile && (
          <button 
            className="btn btn-link text-white p-0 sidebar-close-btn" 
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
            <Link to={item.path} onClick={onClose}>
              <i className={`bi bi-${item.icon}`}></i> {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;