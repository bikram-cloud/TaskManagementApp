import React from 'react';
import './Header.css';

const Header = () => {
  const handlePageReload = () => {
    window.location.reload();
  };

  return (
    <div className="header">
      <h1>Task Manager</h1>
      <button onClick={handlePageReload}>Reload</button>
    </div>
  );
};

export default Header;
