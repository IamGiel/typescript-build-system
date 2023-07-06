import React from 'react';

export const MatchoryResultListLoader = () => {
  return (
    <div className="matchory-map-container-section flex flex-row h-[585px] w-[862px] my-[24px] gap-[12px]">
      <div className="supplier-list-section flex-auto w-[746px] border-gray-200 overflow-auto">
        {[...Array(5)].map((_, idx) => {
          const isLastItem = idx === 4;
          return (
            <div
              key={idx}
              className={`supplier-list-item-container flex gap-[12px] p-[12px] h-[88px] border-t ${
                isLastItem ? 'border-b' : ''
              } border-gray-200`}
            >
              <div className="box-placeholder flex justify-center items-center">
                <div
                  className="box flex"
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#D9D9D9',
                  }}
                ></div>
              </div>
              <div className="supplier-info flex flex-col">
                <div className="supplier-name-div font-inter font-[600] text-[16px] text-[#222429] mb-[12px]">
                  <div
                    className="loader-square animate-pulse"
                    style={{
                      width: '200px',
                      height: '20px',
                      backgroundColor: '#EEF0F5',
                    }}
                  ></div>
                </div>
                <div className="sup-details-div flex flex-row gap-[24px]">
                  <div className="mid-container-details flex">
                    <div className="imgdiv flex mr-[6px]">
                      <div
                        className="loader-square animate-pulse"
                        style={{
                          width: '300px',
                          height: '20px',
                          backgroundColor: '#EEF0F5',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="icon-holder ml-auto">
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
          );
        })}
      </div>

      <div className="map-section flex-auto w-[490px]">
        <span>MAP SECTION </span>
      </div>
    </div>
  );
};
