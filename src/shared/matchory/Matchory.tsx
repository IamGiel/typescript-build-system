import React, { useEffect, useState } from 'react';
import Logo from '../../assets/images/matchory_logo.svg';
import filterIcon from '../../assets/images/filterIcon.svg';
import { MatchoryResultHeader, MatchoryMap, MatchorySearch } from './index';
import {
  alternativesArr,
  buyersArr,
  hscodesArr,
  keywordsArr,
  locationsArr,
  mfgsArr,
} from './sampledata';
import { simulateAPICall } from '../../service/fetch';

export const Matchory = () => {
  const [selectedPillWords, setSelectedPillWords] = useState(searchResultsData);

  const searchDatafromapi = [
    {
      sectionName: 'Keywords',
      suggested: 'Suggested Keywords',
      preselectedItems: keywordsArr,
      isOpen: false,
      tagname: `TagName_Keywords`.trim().toUpperCase(),
    },
    {
      sectionName: 'Manufacturing Processes',
      suggested: 'Suggested Mfg Processes',
      preselectedItems: mfgsArr,
      isOpen: false,
      tagname: `TagName_Manufacturing`.trim().toUpperCase(),
    },
    {
      sectionName: 'Alternative keywords',
      suggested: 'Suggested Mfg Processes',
      preselectedItems: alternativesArr,
      isOpen: false,
      tagname: `TagName_Alternative`.trim().toUpperCase(),
    },
  ];

  const filterDatafromapi = [
    {
      sectionName: 'Locations',
      suggested: 'Suggested locations',
      preselectedItems: locationsArr,
      isOpen: false,
      tagname: `TagName_Locations`.trim().toUpperCase(),
    },
    {
      sectionName: 'HS-Codes',
      suggested: 'Suggested HS-codes',
      preselectedItems: hscodesArr,
      isOpen: false,
      tagname: `TagName_HSCODES`.trim().toUpperCase(),
    },
    {
      sectionName: 'Buyers',
      suggested: 'Suggested buyers',
      preselectedItems: buyersArr,
      isOpen: false,
      tagname: `TagName_Buyers`.trim().toUpperCase(),
    },
  ];

  const searchResultsData = {
    totalResults: 12346,
    searchterm: 'Asynchronous motor',
    keywords: [
      { name: 'Generator', isSelected: false },
      { name: 'AC/DC', isSelected: false },
      { name: 'Generator2', isSelected: false },
      {
        name: 'Threephase motor asdasdasdassssd sdsda sd 1',
        isSelected: false,
      },
      { name: 'Squirrel cage motor 1', isSelected: false },
      { name: 'electric motor 1', isSelected: false },
      { name: 'Generator3', isSelected: false },
      { name: 'AB/DC', isSelected: false },
      { name: 'Generator4', isSelected: false },
      { name: 'Threephase motor 2', isSelected: false },
      { name: 'Squirrel cage motor 2', isSelected: false },
      { name: 'electric motor 2', isSelected: false },
      { name: 'Generator5', isSelected: false },
      { name: 'AZ/DC', isSelected: false },
      { name: 'Generator6', isSelected: false },
      { name: 'Threephase motor 3', isSelected: false },
      { name: 'Squirrel cage motor 3', isSelected: false },
      { name: 'electric motor 3', isSelected: false },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await simulateAPICall(searchResultsData);
        console.log(response);
        setSelectedPillWords(response);
      } catch (error) {
        // Handle any error that may occur during the API call
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(selectedPillWords);
  }, [selectedPillWords]);

  const onclickPillHandler = (itemName) => {
    const updatedKeywords = selectedPillWords.keywords.map((keyword) => {
      if (keyword.name === itemName) {
        return { ...keyword, isSelected: !keyword.isSelected };
      }
      return keyword;
    });

    setSelectedPillWords((prevState) => ({
      ...prevState,
      keywords: updatedKeywords,
    }));
  };

  const onClickClearAll = () => {
    const updatedKeywords = selectedPillWords.keywords.map((keyword) => ({
      ...keyword,
      isSelected: false,
    }));

    setSelectedPillWords((prevState) => ({
      ...prevState,
      keywords: updatedKeywords,
    }));
  };

  return (
    <div className="matchory-parent-container bg-[#F8F8F8] p-[12px]">
      <div className="titleHeader flex flex-row font-[700] font-[inter] text-left text-[#111827] text-[30px]">
        Supplier Search
      </div>
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
      <div className="matchory-body flex flex-row  mt-[12px] gap-[48px]">
        <div className="left-search-filter-section flex flex-col gap-[12px]">
          {/* search */}
          <div className="search-section-container">
            <MatchorySearch
              title="Search"
              purpose="Search"
              data={searchDatafromapi}
              isOpen={false}
            />
          </div>
          {/* filter */}
          <div className="filter-section-container">
            <MatchorySearch
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
              results={selectedPillWords}
              onClickPill={onclickPillHandler}
              clearAllClicked={onClickClearAll}
            />
          </div>
          <div className="map-container-seciton">
            <MatchoryMap />
          </div>
        </div>
      </div>
    </div>
  );
};
