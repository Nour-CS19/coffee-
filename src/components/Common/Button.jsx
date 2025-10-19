import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  icon,
  fullWidth = false
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'w-100' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <i className={`bi bi-${icon} me-2`}></i>}
      {children}
    </button>
  );
};

export default Button;