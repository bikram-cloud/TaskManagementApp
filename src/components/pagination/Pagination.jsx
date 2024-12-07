import React from 'react';
import './Pagination.css';

const Pagination = ({
  totalTasks,
  tasksPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  if (totalPages <= 1) return null;

  const handleClick = page => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? 'active' : ''}
          onClick={() => handleClick(index + 1)}>
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
