import React, { useEffect, useState } from 'react';
import { XIcon, xicon } from '../../assets/images/xicon';
import { MatchoryResultHeaderLoader } from './loaders/MatchoryResultHeaderLoader';
import { simulateAPICall } from '../../service/fetch';
// import xicon from '../../assets/images/x-icon.svg';

export const MatchoryResultHeader = ({
  results,
  onClickPill,
  clearAllClicked,
}) => {
  const [data, setData] = useState(null);

  const fetch = () => {
    setData(results);
  };

  useEffect(() => {
    fetch();
  }, [results]);

  if (!data || !data.keywords) {
    return <MatchoryResultHeaderLoader />; // Return null or a loading indicator if data is not available yet
  }
  const selectedKeywords = data.keywords.filter((item) => item.isSelected);

  return (
    <div className="MatchoryResultHeader-section-container min-h-[161px] w-[861px] p-[12px] bg-[#ffffff] mb-[12px]">
      <div className="searches-result-section flex flex-row justify-between font-inter font-[700] text-[14px] text-[#1F2937] mb-[12px]">
        <div className="total-searches flex gap-[12px]">
          <span>
            {data.totalResults} Search Results, for Asynchronous motor
          </span>
        </div>
        {selectedKeywords.length > 0 && (
          <div className="clear-all flex gap-[12px] text-[#4F46E5] text-[14px] font-[500]">
            <div className="clear-all">
              <span>Clear all</span>
            </div>
            <div className="x-icon flex">
              <button className="filter-btn" onClick={clearAllClicked}>
                <XIcon height={'20px'} width={'20px'} fill={'#8E8AE4'} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="keywords-result-section flex flex-wrap gap-[12px] max-h-[111px] overflow-y-auto">
        {data.keywords.map((item, idx) => (
          <div
            className="result-header-keywords-lists flex flex-wrap gap-[12px]"
            key={idx}
          >
            <div className="result-header-button-container flex gap-[12px] flex-shrink-0">
              <button
                className={`btn-pill rounded-[12px] px-[12px] py-[2px] flex p-[5px] ${
                  item.isSelected
                    ? 'bg-[#DDDCF7] w-[100px]'
                    : 'bg-[#EEF0F5] w-[100px]'
                }`}
                title={item.name}
                onClick={() => onClickPill(item.name, 'RESULT-SECTION')}
              >
                <span className="flex max-w-[100px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter">
                  {item.name}
                </span>
                {item.isSelected && (
                  <span className="xicon-span flex items-center my-[2px] mx-[5px]">
                    <XIcon height={'16'} width={'16'} fill={'#8E8AE4'} />
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
