import React, { useEffect, useState } from 'react';

export const MatchoryResultHeader = ({ results }) => {
  const [data, setData] = useState(results | {});
  useEffect(() => {
    setData(results);
    console.log(data);
  }, []);
  return (
    <div className="MatchoryResultHeader-section-container h-[161px] w-[861px] ">
      <div className="searches-result-section flex flex-row justify-between">
        <div className="total-searches">
          <span>2358 Search Results, for Asynchronous motor</span>
        </div>
        <div className="clear-all">
          <span>Clear all</span>
          <span>X</span>
        </div>
      </div>
      <div className="keywords-result-section flex flex-wrap">
        {data &&
          data.keywords &&
          data.keywords.map((item, idx) => {
            return (
              <div
                className="result-header-keywords-lists flex flex-wrap gap-[12px]"
                key={idx}
              >
                <div className="result-header-button-container flex gap-[12px] flex-shrink-0">
                  <button
                    className={`max-w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                      item.isSelected ? 'bg-[#E0E7FF]' : 'bg-[#F3F4F6]'
                    }`}
                    title={item.name}
                    onClick={() => clickHandler(idx, sectionLabelName)}
                  >
                    {item.name}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
