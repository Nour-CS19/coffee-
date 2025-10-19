import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  icon,
  fullWidth = false,
  style,
  className = ''
}) => {
  // Merge styles with important flag support
  const buttonStyle = style ? {
    ...style,
    backgroundColor: style.backgroundColor,
    borderColor: style.borderColor,
    color: style.color
  } : {};

  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'w-100' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
    >
      {icon && <i className={`bi bi-${icon} me-2`}></i>}
      {children}
    </button>
  );
};

export default Button;