import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';

export const PepList = ({ peplist }) => {
  const itemsPerPage = 10; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    console.log('peplist ', peplist);
  }, []);
  return (
    <div className="pep-list-container flex flex-col">
      <div className="filter-search-row grid grid-cols-4  mb-[12px] px-[12px]">
        <div className="showing-num-list py-2 col-span-3 flex flex-row gap-[12px]">
          <span className="display-amt p-[6px]">Displaying 10 of 421</span>
          <span className="result-total border border-slate-300 rounded p-[6px]">
            10 results
          </span>
          <span className="chevron-icon">
            <MagnifyingGlassIcon />
          </span>
        </div>
        <div className="search-container col-span-1 flex flex-row justify-center py-2 relative border border-slate-300 rounded">
          <span className="absolute left-[12px] top-[12px]">🔎</span>
          <input
            className="rounded p-[6px] focus:outline-none"
            type="text"
            placeholder="search"
          />
        </div>
      </div>

      <div className="grid grid-cols-6">
        <div className="col-span-1 text-left py-2 px-[12px]">PRIMARY NAME</div>
        <div className="col-span-1 text-left py-2 px-[12px]">ROLE</div>
        <div className="col-span-1 text-left py-2 px-[12px]">NATIONALITY</div>
        <div className="col-span-3 text-left py-2 px-[12px]">RISK TYPE ⌽</div>
      </div>
      <div className="peplist-iterated">
        {peplist &&
          peplist
            .slice(0, currentPage * itemsPerPage) // Slice the array based on current page and itemsPerPage
            .map((pep, idx) => (
              <div className="item-container grid grid-cols-6" key={idx}>
                <div className="peplist-item col-span-1 text-left py-2 px-[12px]">
                  {pep.firstName} {pep.lastName}
                </div>
                <div className="peplist-item col-span-1 text-left py-2 px-[12px]">
                  {pep.company.department}
                </div>
                <div className="peplist-item col-span-1 text-left py-2 px-[12px]">
                  {pep.company.address.city}
                </div>
                <div className="peplist-item col-span-1 text-left py-2 px-[12px]">
                  {pep.bloodGroup}
                </div>
              </div>
            ))}
      </div>
      {currentPage * itemsPerPage < peplist.length && ( // Show Load More button conditionally
        <div className="flex justify-center mt-4">
          <button
            className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
