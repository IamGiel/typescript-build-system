import React from 'react';

export const MatchoryFiltersLoader = () => {
  return (
    <div className="matchory-search-container block w-[312px] bg-[#F8F8F8]">
      <div className="title-section flex justify-between p-[12px] h-[56px] text-[16px] font-[700] border-b-[1px] border-[#CBD1E2]">
        <div className="titlename flex leading-[24px] ">
          <div
            className="loader-square animate-pulse"
            style={{
              width: '80px',
              height: '20px',
              backgroundColor: '#EEF0F5',
              borderRadius: '3px',
            }}
          ></div>
        </div>
      </div>

      {[...Array(8)].map((section, id) => (
        <div
          className="keyword-section items-center gap-[12px] p-[12px] border-b-[1px] border-[#CBD1E2]"
          key={id}
        >
          <div className="tagnamesMappings-section-opener-mapping">
            <div
              className="loader-square animate-pulse"
              style={{
                width: '150px',
                height: '20px',
                backgroundColor: '#EEF0F5',
                borderRadius: '2px',
              }}
            ></div>
          </div>
        </div>
      ))}

      <div className="reset-matchorysearch-section flex justify-end items-center h-[70px] gap-[12px] px-[12px]">
        <div className="Reset-holder flex animate-pulse place-content-evenly items-center text-[14px] text-[#5650D6] font-[500] h-[38px] w-[81px] cursor-pointer"></div>
        <div className="cancel-holder animate-pulse flex place-content-evenly items-center text-[14px] text-[#444752] font-[500] rounded-[12px] border h-[38px] w-[81px] cursor-pointer"></div>
        <div className="searchBtn-holder animate-pulse flex place-content-evenly items-center text-[14px] text-[#FFFFFF] font-[500] rounded-[12px] bg-[#5650D6] border h-[38px] w-[81px] cursor-pointer"></div>
      </div>
    </div>
  );
};
