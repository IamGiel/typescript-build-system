import React, { CSSProperties, useEffect, useState } from 'react';
import infoCircle from '../../assets/images/info-circle.svg';
import chevronUp from '../../assets/images/chevron_up.svg';
import chevronDown from '../../assets/images/chevron_down.svg';
import { sectionLabels } from './sampledata';

type Addword = {
  name: string;
  isSelected: boolean;
};

type MatchoryData = {
  sectionName: string;
  suggested: string;
  preselectedItems: Addword[];
  tagname: string;
};

type MatchorySearch = {
  title: 'Search' | 'Filter';
  purpose: string;
  data: MatchoryData[];
  icon?: React.ReactElement;
};

export const MatchorySearch = ({
  title,
  icon,
  data,
  purpose,
}: MatchorySearch) => {
  // search section
  const [openKeyWords, setOpenKeyWords] = useState(false);
  const [openMfgs, setOpenMfgs] = useState(false);
  const [openAlternatives, setOpenAlternatives] = useState(false);

  const [selectedKeyWords, setSelectedKeyWords] = useState([]);
  const [selectedMfgProcesses, setSelectedMfgProcesses] = useState([]);
  const [selectedAlternatives, setSelectedAlternatives] = useState([]);

  const [newKeyword, setNewKeyword] = useState('');
  const [newMfgsKeyWord, setNewMfgsKeyWord] = useState('');
  const [newAlternativeKeyword, setNewAlternativeKeyword] = useState('');

  // filter section
  const [openLocations, setOpenLocations] = useState(false);
  const [openHSCodes, setOpenHSCodes] = useState(false);
  const [openBuyers, setOpenBuyers] = useState(false);

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedHSCodes, setSelectedHSCodes] = useState([]);
  const [selectedBuyers, setSelectedBuyers] = useState([]);

  const [newLocation, setNewLocation] = useState('');
  const [newHSCode, setNewHSCode] = useState('');
  const [newBuyer, setNewBuyer] = useState('');

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item) => {
        console.log('this is item in useeffect ', item);
        const { tagname, preselectedItems } = item;
        switch (tagname) {
          case 'TAGNAME_KEYWORDS':
            setSelectedKeyWords(preselectedItems);
            break;
          case 'TAGNAME_MANUFACTURING':
            setSelectedMfgProcesses(preselectedItems);
            break;
          case 'TAGNAME_ALTERNATIVE':
            setSelectedAlternatives(preselectedItems);
            break;
          case 'TAGNAME_LOCATIONS':
            setSelectedLocations(preselectedItems);
            break;
          case 'TAGNAME_HSCODES':
            setSelectedHSCodes(preselectedItems);
            break;
          case 'TAGNAME_BUYERS':
            setSelectedBuyers(preselectedItems);
            break;
          // Add more cases if needed for additional tag names
          default:
            break;
        }
      });
    }
  }, [data]);

  // console.log(data[0]);
  // console.log(typeof selectedKeyWords);

  const handleBtnSelectKeyWords = (index, sectionName) => {
    console.log('what is section name ', sectionName);
    const sectionStateMap = {
      [sectionLabels.keyword]: [selectedKeyWords, setSelectedKeyWords],
      [sectionLabels.mfgprocess]: [
        selectedMfgProcesses,
        setSelectedMfgProcesses,
      ],
      [sectionLabels.alternative]: [
        selectedAlternatives,
        setSelectedAlternatives,
      ],
      [sectionLabels.locations]: [selectedLocations, setSelectedLocations],
      [sectionLabels.hscodes]: [selectedHSCodes, setSelectedHSCodes],
      [sectionLabels.buyers]: [selectedBuyers, setSelectedBuyers],
    };

    const [selectedState, setSelectedState] = sectionStateMap[sectionName];
    // Create a copy of the selected state array
    const updatedState = [...selectedState];
    // Get the selected keyword object
    const selectedKeyword = updatedState[index];

    console.log('selected key word here ', selectedKeyword);
    // Toggle the isSelected property of the selected keyword
    selectedKeyword.isSelected = !selectedKeyword.isSelected;
    // Update the state with the modified array
    setSelectedState(updatedState);
  };

  const handleKeyDown = (e, tagname) => {
    console.log('tagname ', tagname, e.key);
    if (e.key === 'Enter') {
      if (tagname === `TagName_Keywords`.trim().toUpperCase()) {
        handleAddItem(tagname, newKeyword, setNewKeyword, setSelectedKeyWords);
      }
      if (tagname === `TagName_Manufacturing`.trim().toUpperCase()) {
        handleAddItem(
          tagname,
          newMfgsKeyWord,
          setNewMfgsKeyWord,
          setSelectedMfgProcesses
        );
      }
      if (tagname === `TagName_Alternative`.trim().toUpperCase()) {
        handleAddItem(
          tagname,
          newAlternativeKeyword,
          setNewAlternativeKeyword,
          setSelectedAlternatives
        );
      }

      if (tagname === `TagName_locations`.trim().toUpperCase()) {
        handleAddItem(
          tagname,
          newLocation,
          setNewLocation,
          setSelectedLocations
        );
      }

      if (tagname === `TagName_hscodes`.trim().toUpperCase()) {
        handleAddItem(tagname, newHSCode, setNewHSCode, setSelectedHSCodes);
      }
      if (tagname === `TagName_buyers`.trim().toUpperCase()) {
        handleAddItem(tagname, newBuyer, setNewBuyer, setSelectedBuyers);
      }
    }
  };

  const handleAddItem = (tagname, newItem) => {
    if (newItem.trim() === '') return; // Ignore empty input

    if (tagname === 'TagName_Keywords'.trim().toUpperCase()) {
      const updatedKeywords = selectedKeyWords.length
        ? [...selectedKeyWords, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedKeyWords(updatedKeywords);
      setNewKeyword(''); // Reset the input field
    }

    if (tagname === 'TagName_Manufacturing'.trim().toUpperCase()) {
      const updatedMfgProcesses = selectedMfgProcesses.length
        ? [...selectedMfgProcesses, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedMfgProcesses(updatedMfgProcesses);
      setNewMfgsKeyWord(''); // Reset the input field setNewMfgsKeyWord
    }

    if (tagname === 'TagName_Alternative'.trim().toUpperCase()) {
      const updatedAlternatives = selectedAlternatives.length
        ? [...selectedAlternatives, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedAlternatives(updatedAlternatives);
      setNewAlternativeKeyword(''); // Reset the input field
    }
    if (tagname === 'TagName_locations'.trim().toUpperCase()) {
      const updatedLocations = selectedLocations.length
        ? [...selectedLocations, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedLocations(updatedLocations);
      setNewLocation(''); // Reset the input field
    }
    if (tagname === 'TagName_hscodes'.trim().toUpperCase()) {
      const updatedHScodes = selectedHSCodes.length
        ? [...selectedHSCodes, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedHSCodes(updatedHScodes);
      setNewHSCode(''); // Reset the input field
    }
    if (tagname === 'TagName_buyers'.trim().toUpperCase()) {
      const updatedBuyers = selectedBuyers.length
        ? [...selectedBuyers, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedBuyers(updatedBuyers);
      setNewBuyer(''); // Reset the input field
    }
  };

  const onClickFilterBtn = () => {
    const openAll = !(
      openKeyWords &&
      openMfgs &&
      openAlternatives &&
      openLocations &&
      openHSCodes &&
      openBuyers
    );
    setOpenKeyWords(openAll);
    setOpenMfgs(openAll);
    setOpenAlternatives(openAll);

    setOpenLocations(openAll);
    setOpenHSCodes(openAll);
    setOpenBuyers(openAll);
  };

  const getToggleSection = (sectionName) => {
    switch (sectionName) {
      case `TagName_Keywords`.trim().toUpperCase():
        return setOpenKeyWords(!openKeyWords);
      case `TagName_Manufacturing`.trim().toUpperCase():
        return setOpenMfgs(!openMfgs);
      case `TagName_Alternative`.trim().toUpperCase():
        return setOpenAlternatives(!openAlternatives);

      case `TagName_Locations`.trim().toUpperCase():
        return setOpenLocations(!openLocations);
      case `TagName_hscodes`.trim().toUpperCase():
        return setOpenHSCodes(!openHSCodes);
      case `TagName_buyers`.trim().toUpperCase():
        return setOpenBuyers(!openBuyers);

      default:
        return null; // Return null if the section name doesn't match any known sections
    }
  };

  const tooltip = (someMessage: string) => {
    return (
      <div className="group relative">
        <img
          className="infocircle pt-[4px] mr-3 cursor-pointer"
          src={infoCircle}
          alt="info"
        />
        <p className="absolute top-[0px] w-[200px] h-[fit-content] z-[1] scale-0 transition-all rounded bg-[#c8cbd5] border border-[#ededf8] p-[12px] text-[12px] font-[500] text-[#181818] group-hover:scale-100 justify-center">
          {someMessage}
        </p>
      </div>
    );
  };

  return (
    <div className="matchory-search-container block w-[312px] bg-[#F8F8F8]">
      <div className="title-section flex justify-between p-[12px] h-[56px] text-[16px] font-[700] border-b-[1px] border-[#CBD1E2]">
        <div className="titlename flex leading-[24px]">{title}</div>
        {icon && (
          <div className="icon-prop-isAvaialble flex">
            <button className="filter-btn" onClick={() => onClickFilterBtn()}>
              <img src={icon} alt="filtericon" />
            </button>
          </div>
        )}
      </div>

      {data.map((section, id) => (
        <div
          className="keyword-section items-center gap-[12px] p-[12px] border-b-[1px] border-[#CBD1E2]"
          key={id}
        >
          <div className="section-opener flex justify-between">
            <div className="right-divs flex items-center">
              <span className="font-inter font-[500] text-[14px] leading-[20px] mr-3">
                {section.sectionName} (
                {
                  section.preselectedItems.filter((item) => item.isSelected)
                    .length
                }
                )
              </span>
              <div className="tooltip-section">
                {tooltip(
                  'This is tooltip. Magna magna dolor aliquip fugiat labore fugiat Lorem sint labore et proident commodo commodo dolor.'
                )}
              </div>
            </div>
            <div className="chevron-container">
              <img
                className="infocircle pt-[4px] cursor-pointer"
                src={section.isOpen ? chevronUp : chevronDown}
                alt="open"
                onClick={() => {
                  const sectionName = section.tagname || section.sectionName;
                  const isOpen = section.isOpen;
                  const toggleSection = getToggleSection(sectionName); // Function to toggle the section

                  if (toggleSection) {
                    toggleSection(!isOpen);
                  }
                }}
              />
            </div>
          </div>

          {section.sectionName === 'Keywords' && openKeyWords && (
            <div className="keywords-list-container flex flex-col">
              {/* Render the keywords section */}
              {/* ... */}
              <div className="sec-sub-header flex flex-row gap-[12px] mt-[12px] mb-[12px]">
                <div className="flex">
                  <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#656B7C]">
                    {section.suggested}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#5650D6]">
                    Reset
                  </span>
                </div>
              </div>

              <div className="keywords-lists flex flex-wrap gap-[12px]">
                {selectedKeyWords &&
                  selectedKeyWords.map(
                    (item, idx) =>
                      item.isSelected && (
                        <div
                          className="button-container flex gap-[12px] flex-shrink-0"
                          key={idx}
                        >
                          <button
                            className={`max-w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                              item.isSelected ? 'bg-[#E0E7FF]' : 'bg-[#F3F4F6]'
                            }`}
                            title={item.name}
                            onClick={() =>
                              handleBtnSelectKeyWords(
                                idx,
                                sectionLabels.keyword
                              )
                            }
                          >
                            {item.name}
                          </button>
                        </div>
                      )
                  )}
              </div>

              <div className="input-keywords">
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    placeholder="Add a keyword"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(evt) => handleKeyDown(evt, section.tagname)}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] placeholder:text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          )}
          {section.sectionName === 'Manufacturing Processes' && openMfgs && (
            <div className="keywords-list-container flex flex-col">
              {/* Render the manufacturing processes section */}
              {/* ... */}
              <div className="keywords-list-container flex flex-col">
                <div className="sec-sub-header flex flex-row gap-[12px] mt-[12px] mb-[12px]">
                  <div className="flex">
                    <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#656B7C]">
                      {section.suggested}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#5650D6]">
                      Reset
                    </span>
                  </div>
                </div>
                <div className="keywords-lists flex flex-wrap gap-[12px]">
                  {selectedMfgProcesses &&
                    selectedMfgProcesses.map(
                      (item, idx) =>
                        item.isSelected && (
                          <div
                            className="button-container flex gap-[12px] flex-shrink-0"
                            key={idx}
                          >
                            <button
                              className={`max-w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                                item.isSelected
                                  ? 'bg-[#E0E7FF]'
                                  : 'bg-[#F3F4F6]'
                              }`}
                              title={item.name}
                              onClick={() =>
                                handleBtnSelectKeyWords(
                                  idx,
                                  sectionLabels.mfgprocess
                                )
                              }
                            >
                              {item.name}
                            </button>
                          </div>
                        )
                    )}
                </div>
                <div className="input-keywords">
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      placeholder="Add a keyword"
                      value={newMfgsKeyWord}
                      onChange={(e) => setNewMfgsKeyWord(e.target.value)}
                      onKeyDown={(evt) => handleKeyDown(evt, section.tagname)}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] placeholder:text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {section.sectionName === 'Alternative keywords' &&
            openAlternatives && (
              <div className="keywords-list-container flex flex-col">
                {/* Render the alternative keywords section */}
                {/* ... */}
                <div className="keywords-list-container flex flex-col">
                  <div className="sec-sub-header flex flex-row gap-[12px] mt-[12px] mb-[12px]">
                    <div className="flex">
                      <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#656B7C]">
                        {section.suggested}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#5650D6]">
                        Reset
                      </span>
                    </div>
                  </div>

                  <div className="keywords-lists flex flex-wrap gap-[12px]">
                    {selectedAlternatives &&
                      selectedAlternatives.map(
                        (item, idx) =>
                          item.isSelected && (
                            <div
                              className="button-container flex gap-[12px] flex-shrink-0"
                              key={idx}
                            >
                              <button
                                className={`max-w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                                  item.isSelected
                                    ? 'bg-[#E0E7FF]'
                                    : 'bg-[#F3F4F6]'
                                }`}
                                title={item.name}
                                onClick={() =>
                                  handleBtnSelectKeyWords(
                                    idx,
                                    sectionLabels.alternative
                                  )
                                }
                              >
                                {item.name}
                              </button>
                            </div>
                          )
                      )}
                  </div>
                  <div className="input-keywords">
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        placeholder="Add a keyword"
                        value={newAlternativeKeyword}
                        onChange={(e) =>
                          setNewAlternativeKeyword(e.target.value)
                        }
                        onKeyDown={(evt) => handleKeyDown(evt, section.tagname)}
                        autoComplete="given-name"
                        className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] placeholder:text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          {section.sectionName === 'Locations' && openLocations && (
            <div className="keywords-list-container flex flex-col">
              {/* Render the alternative keywords section */}
              {/* ... */}
              <div className="keywords-list-container flex flex-col">
                <div className="sec-sub-header flex flex-row gap-[12px] mt-[12px] mb-[12px]">
                  <div className="flex">
                    <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#656B7C]">
                      {section.suggested}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#5650D6]">
                      Reset
                    </span>
                  </div>
                </div>

                <div className="keywords-lists flex flex-wrap gap-[12px]">
                  {selectedLocations &&
                    selectedLocations.map(
                      (item, idx) =>
                        item.isSelected && (
                          <div
                            className="button-container flex gap-[12px] flex-shrink-0"
                            key={idx}
                          >
                            <button
                              className={`max-w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                                item.isSelected
                                  ? 'bg-[#E0E7FF]'
                                  : 'bg-[#F3F4F6]'
                              }`}
                              title={item.name}
                              onClick={() =>
                                handleBtnSelectKeyWords(
                                  idx,
                                  sectionLabels.locations
                                )
                              }
                            >
                              {item.name}
                            </button>
                          </div>
                        )
                    )}
                </div>
                <div className="input-keywords">
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      placeholder="Add a keyword"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      onKeyDown={(evt) => handleKeyDown(evt, section.tagname)}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] placeholder:text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {section.sectionName === 'HS-Codes' && openHSCodes && (
            <div className="keywords-list-container flex flex-col">
              {/* Render the alternative keywords section */}
              {/* ... */}
              <div className="keywords-list-container flex flex-col">
                <div className="sec-sub-header flex flex-row gap-[12px] mt-[12px] mb-[12px]">
                  <div className="flex">
                    <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#656B7C]">
                      {section.suggested}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#5650D6]">
                      Reset
                    </span>
                  </div>
                </div>

                <div className="keywords-lists flex flex-wrap gap-[12px]">
                  {selectedHSCodes &&
                    selectedHSCodes.map(
                      (item, idx) =>
                        item.isSelected && (
                          <div
                            className="button-container flex gap-[12px] flex-shrink-0"
                            key={idx}
                          >
                            <button
                              className={`max-w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                                item.isSelected
                                  ? 'bg-[#E0E7FF]'
                                  : 'bg-[#F3F4F6]'
                              }`}
                              title={item.name}
                              onClick={() =>
                                handleBtnSelectKeyWords(
                                  idx,
                                  sectionLabels.hscodes
                                )
                              }
                            >
                              {item.name}
                            </button>
                          </div>
                        )
                    )}
                </div>
                <div className="input-keywords">
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      placeholder="Add a keyword"
                      value={newHSCode}
                      onChange={(e) => setNewHSCode(e.target.value)}
                      onKeyDown={(evt) => handleKeyDown(evt, section.tagname)}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] placeholder:text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {section.sectionName === 'Buyers' && openHSCodes && (
            <div className="keywords-list-container flex flex-col">
              {/* Render the alternative keywords section */}
              {/* ... */}
              <div className="keywords-list-container flex flex-col">
                <div className="sec-sub-header flex flex-row gap-[12px] mt-[12px] mb-[12px]">
                  <div className="flex">
                    <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#656B7C]">
                      {section.suggested}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#5650D6]">
                      Reset
                    </span>
                  </div>
                </div>

                <div className="keywords-lists flex flex-wrap gap-[12px]">
                  {selectedBuyers &&
                    selectedBuyers.map(
                      (item, idx) =>
                        item.isSelected && (
                          <div
                            className="button-container flex gap-[12px] flex-shrink-0"
                            key={idx}
                          >
                            <button
                              className={`max-w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                                item.isSelected
                                  ? 'bg-[#E0E7FF]'
                                  : 'bg-[#F3F4F6]'
                              }`}
                              title={item.name}
                              onClick={() =>
                                handleBtnSelectKeyWords(
                                  idx,
                                  sectionLabels.buyers
                                )
                              }
                            >
                              {item.name}
                            </button>
                          </div>
                        )
                    )}
                </div>
                <div className="input-keywords">
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      placeholder="Add a keyword"
                      value={newBuyer}
                      onChange={(e) => setNewBuyer(e.target.value)}
                      onKeyDown={(evt) => handleKeyDown(evt, section.tagname)}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] placeholder:text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="reset-matchorysearch-section flex justify-end items-center h-[70px] gap-[12px] px-[12px]">
        <div className="Reset-holder flex place-content-evenly items-center text-[14px] text-[#5650D6] font-[500] h-[38px] w-[81px] cursor-pointer">
          <span className="reset-label">Reset</span>
        </div>
        <div className="cancel-holder flex place-content-evenly items-center text-[14px] text-[#444752] font-[500] rounded-[12px] border border-[#CBD1E2] h-[38px] w-[81px] cursor-pointer">
          <button className="reset-label">Cancel</button>
        </div>
        <div className="searchBtn-holder flex place-content-evenly items-center text-[14px] text-[#FFFFFF] font-[500] rounded-[12px] bg-[#5650D6] border border-[#CBD1E2] h-[38px] w-[81px] cursor-pointer">
          <button className="reset-label">{title}</button>
        </div>
      </div>
    </div>
  );
};
