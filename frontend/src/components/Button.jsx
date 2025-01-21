import React from 'react'

const Button = ({ label, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded text-white ${disabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} ${className}`}
    >
      {label}
    </button>
  );
};


export default Button