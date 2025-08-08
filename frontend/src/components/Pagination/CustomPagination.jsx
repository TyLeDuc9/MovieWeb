import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
export const CustomPagination = ({ currentPage, totalItems, itemsPerPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [inputPage, setInputPage] = useState(currentPage);
  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const value = parseInt(inputPage, 10);
      if (!isNaN(value) && value >= 1 && value <= totalPages) {
        setCurrentPage(value);
      }
    }
  };
  const handleClick = (delta) => {
    const newPage = currentPage + delta
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="flex items-center space-x-2  text-white px-4 py-2 rounded-full">
      <button
        onClick={() => handleClick(-1)}
        className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full bg-[#2c2c3a] hover:bg-[#3a3a4a] disabled:opacity-40"
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>

      <div className="flex items-center bg-[#2c2c3a] px-6 py-3 rounded-full space-x-2">
        <span className="text-sm text-gray-300 font-bold">Trang</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-12 text-center bg-transparent border border-gray-500 
          rounded px-1 text-white focus:outline-none font-bold" 
        />
        <span className="text-sm text-white font-bold">/ {totalPages}</span>
      </div>


      <button
        onClick={() => handleClick(1)}
        className="w-10 h-10 flex items-center justify-center cursor-pointer
         rounded-full bg-[#2c2c3a] hover:bg-[#3a3a4a] disabled:opacity-40 font-bold"
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};
