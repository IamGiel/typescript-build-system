import React from 'react';

export const MatchorySearch = () => {
  return (
    <div className="matchory-search-container">
      <div className="input-container">
        <input
          className="mathchory-search-input-field w-[100%] px-[12px] h-[38px] border border-[#CBD1E2] rounded-[6px] text-[14px] font-inter font-[500] placeholder:text-[14px] placeholder:font-inter placeholder:font-[500] focus:border-slate-300 focus:ring-slate-300 focus:outline-none"
          type="text"
          placeholder="Add required keywords here"
        />
      </div>
    </div>
  );
};
