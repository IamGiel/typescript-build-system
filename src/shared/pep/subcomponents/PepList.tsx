import React, { useEffect } from 'react';

export const PepList = ({ peplist }) => {
  useEffect(() => {
    console.log('peplist ', peplist);
  }, []);
  return (
    <div className="pep-list-container flex flex-col">
      <div className="filter-search-row flex flex-row gap-[24px] mb-[12px] px-[12px]">
        <div className="showing-num-list flex flex-col justify-center flex-1 py-2">
          Displaying 10 of 421
        </div>
        <div className="total-search-result flex flex-row flex-grow flex-1 py-2">
          <span className="result-total">10 results</span>
          <span className="chevron-icon">▾</span>
        </div>
        <div className="search-container flex flex-row justify-center">
          <input type="text" placeholder="search" />
        </div>
      </div>
      <div className="grid grid-cols-6">
        <div className="col-span-1 text-left py-2 px-[12px]">PRIMARY NAME</div>
        <div className="col-span-1 text-left py-2 px-[12px]">ROLE</div>
        <div className="col-span-1 text-left py-2 px-[12px]">NATIONALITY</div>
        <div className="col-span-3 text-left py-2 px-[12px]">RISK TYPE ⌽</div>
      </div>
      <div className="grid grid-cols-1">
        {peplist &&
          peplist.length &&
          peplist.map((pep, idx) => {
            return (
              <div className="flex flex-row" key={idx}>
                {/* {JSON.stringify(peplist, null, 4)} */}
                <div className="peplist-item col-span-1 text-left py-2 px-[12px]">
                  {pep.firstName} {pep.lastName}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
