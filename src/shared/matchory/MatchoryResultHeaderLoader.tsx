import React from 'react';
import { XIcon } from '../../assets/images/xicon';

export const MatchoryResultHeaderLoader = () => {
  return (
    <div className="MatchoryResultHeader-section-container min-h-[161px] w-[861px] my-[12px]">
      <div className="searches-result-section flex flex-row justify-between font-inter font-[700] text-[14px] text-[#1F2937] my-[12px]">
        <div className="total-searches flex gap-[12px]">
          <div
            className="loader-square animate-pulse"
            style={{
              width: '60px',
              height: '20px',
              backgroundColor: '#EEF0F5',
            }}
          ></div>
        </div>
        <div className="clear-all flex gap-[12px] text-[#4F46E5] text-[14px] font-[500]">
          <div className="clear-all">
            <div
              className="loader-square animate-pulse"
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#EEF0F5',
              }}
            ></div>
          </div>
          <div className="x-icon flex">
            <div
              className="loader-square animate-pulse"
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#EEF0F5',
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="keywords-result-section flex flex-wrap gap-[12px]">
        {[...Array(15)].map((item) => (
          <div
            className="result-header-keywords-lists flex flex-wrap gap-[12px]"
            key={item}
          >
            <div className="result-header-button-container flex gap-[12px] flex-shrink-0">
              <button
                className="rounded-[12px] px-[12px] py-[2px] flex p-[5px] bg-[#EEF0F5] animate-pulse"
                disabled
              >
                <span className="flex w-[120px] bg-gray-200 h-4 " />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
