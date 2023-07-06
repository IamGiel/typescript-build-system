import React from 'react';
import bookmark from '../../assets/images/Bookmark.svg';
import bookmarkhollow from '../../assets/images/BookmarkHollow.svg';
import locationmarker from '../../assets/images/Locationmarker.svg';
import officebldg from '../../assets/images/OfficeBuilding.svg';
import user from '../../assets/images/Users.svg';
import { MatchoryResultListLoader } from './loaders/MatchoryResultListLoader';
import { Map } from './Map';

export const MatchoryResultList = ({ data, onBookmarkSupplier }) => {
  console.log(data);
  if (!data) {
    return <MatchoryResultListLoader />;
  }
  return (
    <div className="matchory-map-container-section flex flex-row h-[585px] w-[862px] my-[24px] gap-[12px] bg-[#ffffff]">
      <div className="supplier-list-section flex-auto w-[50%] border-gray-200 overflow-auto relative">
        <div className="mapped-section relative">
          {/* <pre>{JSON.stringify(data.suppliers)}</pre> */}
          {data.suppliers.map((item, idx) => {
            const isLastItem = idx === data.suppliers.length - 1;
            const isFirstItem = idx === 0;
            return (
              <div
                key={idx}
                className={`supplier-list-item-container flex gap-[12px] p-[12px] h-[88px] ${
                  isLastItem ? '' : 'border-b'
                } border-gray-200 ${isFirstItem ? '' : 'border-t'}`}
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
                    <span>{item.name}</span>
                  </div>
                  <div className="sup-details-div flex flex-row">
                    <div className="mid-container-details flex">
                      <div className="imgdiv flex mr-[6px]">
                        <img src={locationmarker} alt="loc" />
                      </div>
                      <div className="loc font-inter font-[400] text-[16px]">
                        <span>location</span>
                      </div>
                    </div>
                    <div className="mid-container-details flex px-[12px]">
                      <div className="imgdiv flex mr-[6px]">
                        <img src={officebldg} alt="office" />
                      </div>
                      <div className="loc font-inter font-[400] text-[16px]">
                        <span>domain</span>
                      </div>
                    </div>
                    <div className="mid-container-details flex px-[12px]">
                      <div className="imgdiv flex mr-[6px]">
                        <img src={user} alt="user" />
                      </div>
                      <div className="loc font-inter font-[400] text-[16px]">
                        <span>350</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="icon-holder ml-auto ">
                  <button onClick={() => onBookmarkSupplier(item)}>
                    {item.isSelected ? (
                      <img
                        className="bookmarkicon cursor-pointer"
                        src={bookmark}
                        alt="someicon"
                      />
                    ) : (
                      <img
                        className="bookmarkicon cursor-pointer"
                        src={bookmarkhollow}
                        alt="someicon"
                      />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="map-section flex-auto w-[50%]">
        <div className="map-container">
          <Map canvasHeight={'584px'} canvasWidth={'425px'} />
        </div>
      </div>
    </div>
  );
};
