import React, { useEffect, useState } from 'react';
import Logo from '../../assets/images/matchory_logo.svg';
import filterIcon from '../../assets/images/filterIcon.svg';
import {
  MatchoryFilters,
  MatchoryResultHeader,
  MatchoryResultList,
  MatchorySearch,
} from './index';
import {
  alternativesArr,
  buyersArr,
  filterDatafromapi,
  hscodesArr,
  keywordsArr,
  locationsArr,
  mfgsArr,
  searchDatafromapi,
  searchResultsData,
} from './sampledata';
import { simulateAPICall } from '../../service/fetch';

export const Matchory = () => {
  const [resultsData, setResultsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await simulateAPICall(searchResultsData, 3000);
        console.log('response ', response);
        setResultsData(response);
      } catch (error) {
        // Handle any error that may occur during the API call
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(resultsData);
  }, [resultsData]);

  const onclickPillHandler = (itemName) => {
    const updatedKeywords = resultsData.keywords.map((keyword) => {
      if (keyword.name === itemName) {
        return { ...keyword, isSelected: !keyword.isSelected };
      }
      return keyword;
    });

    setResultsData((prevState) => ({
      ...prevState,
      keywords: updatedKeywords,
    }));
  };

  const onClickClearAll = () => {
    const updatedKeywords = resultsData.keywords.map((keyword) => ({
      ...keyword,
      isSelected: false,
    }));

    setResultsData((prevState) => ({
      ...prevState,
      keywords: updatedKeywords,
    }));
  };

  const handleBookmarkSupplier = (supplierToMark) => {
    console.log('supplier to bookmark ', supplierToMark);
    const updatedSuppliers = resultsData.suppliers.map((supplier) => {
      if (supplier.name === supplierToMark.name) {
        return { ...supplier, isSelected: !supplier.isSelected };
      }
      return supplier; // Add a return statement for the other cases
    });

    setResultsData((prevState) => ({
      ...prevState,
      suppliers: updatedSuppliers,
    }));
  };

  return (
    <div className="matchory-parent-container bg-[#F8F8F8] p-[12px]">
      <div className="titleHeader flex flex-row font-[700] font-[inter] text-left text-[#111827] text-[30px]">
        Supplier Search
      </div>
      <div className="search-container bg-[#ffffff] p-[12px]">
        <div className="search-subcontainer flex flex-col gap-[12px] border-t border-b border-blue-500 border-gray-200 px-[12px] pt-[12px] pb-[6px]">
          <div className="poweredby-matchory">
            <div className="matchory-logo flex flex-row gap-[12px]">
              <div className="poweredby leading-[16px]">
                <span className="font-[400] font-[inter] text-[12px]">
                  powerd by
                </span>
              </div>
              <div className="logo-div">
                <img src={Logo} alt="matchory test" />
              </div>
            </div>
          </div>
          <div className="matchory-search-container">
            <MatchorySearch />
          </div>
        </div>
      </div>
      <div className="matchory-body flex flex-row  mt-[12px] gap-[48px]">
        <div className="left-search-filter-section flex flex-col gap-[12px]">
          {/* search */}
          {/* <div className="search-section-container">
            <MatchorySearchFilters
              title="Search"
              purpose="Search"
              data={searchDatafromapi}
              isOpen={false}
            />
          </div> */}
          {/* filter */}
          <div className="filter-section-container">
            <MatchoryFilters
              title="Filter"
              icon={filterIcon}
              purpose="Search"
              data={filterDatafromapi}
              isOpen={false}
            />
          </div>
        </div>
        <div className="right-results-section">
          <div className="search-pills-seciton">
            <MatchoryResultHeader
              results={resultsData}
              onClickPill={onclickPillHandler}
              clearAllClicked={onClickClearAll}
            />
          </div>
          <div className="map-container-seciton">
            <MatchoryResultList
              data={resultsData}
              onBookmarkSupplier={handleBookmarkSupplier}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
