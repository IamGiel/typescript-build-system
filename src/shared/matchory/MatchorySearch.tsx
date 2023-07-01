import React, { useState } from 'react';
import infoCircle from '../../assets/images/info-circle.svg';
import chevronUp from '../../assets/images/chevron_up.svg';
import chevronDown from '../../assets/images/chevron_down.svg';

type MatchorySearch = {
  title: 'Search' | 'Filter';
  icon?: React.ReactElement;
};

export const MatchorySearch = ({ title, icon }: MatchorySearch) => {
  const keywords = [
    { name: 'corn', isSelected: true },
    { name: 'bran', isSelected: true },
    { name: 'breakfast food', isSelected: true },
    { name: 'grain', isSelected: true },
    { name: 'oats', isSelected: true },
    { name: 'rice', isSelected: true },
    { name: 'rye', isSelected: true },
    { name: 'barley', isSelected: true },
  ];
  const mfgs = [
    { name: 'cereal', isSelected: true },
    { name: 'grass', isSelected: true },
    { name: 'durum', isSelected: true },
    { name: 'gluten', isSelected: true },
    { name: 'semolina', isSelected: true },
    { name: 'spelt', isSelected: true },
  ];
  const sections = {
    keyword: 'KEYWORDS',
    alternative: 'ALTERNATIVE_KEYWORDS',
    mfgprocess: 'MANUFACTURING_PROCESSES',
  };

  const alternatives = [
    { name: 'Harvesting', isSelected: true },
    { name: 'Storage', isSelected: true },
    { name: 'Cleaning', isSelected: true },
    { name: 'Conditioning', isSelected: true },
    { name: 'Bending', isSelected: true },
    { name: 'Grinding', isSelected: true },
    { name: 'Scrap Phase', isSelected: true },
    { name: 'Sieving', isSelected: true },
    { name: 'Packing', isSelected: true },
    { name: 'Destoner', isSelected: true },
    { name: 'Trieur', isSelected: true },
  ];
  const [openKeyWords, setOpenKeyWords] = useState(false);
  const [openMfgs, setOpenMfgs] = useState(false);
  const [openAlternatives, setOpenAlternatives] = useState(false);

  const [selectedKeyWords, setSelectedKeyWords] = useState(keywords);
  const [selectedMfgProcesses, setSelectedMfgProcesses] = useState(mfgs);
  const [selectedAlternatives, setSelectedAlternatives] =
    useState(alternatives);

  const [newKeyword, setNewKeyword] = useState('');
  const [newMfgsKeyWord, setnewMfgsKeyWord] = useState('');
  const [newAlternativeKeyword, setnewAlternativeKeyword] = useState('');

  const handleBtnSelectKeyWords = (index, sectionName) => {
    console.log('what is section name ', sectionName);
    const sectionStateMap = {
      [sections.keyword]: [selectedKeyWords, setSelectedKeyWords],
      [sections.mfgprocess]: [selectedMfgProcesses, setSelectedMfgProcesses],
      [sections.alternative]: [selectedAlternatives, setSelectedAlternatives],
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

  const handleKeyDown = (e, sectionName) => {
    console.log('e here ', e, sectionName);
    if (e.key === 'Enter') {
      if (sectionName === sections.keyword) {
        handleAddKeyword();
      }
      if (sectionName === sections.mfgprocess) {
        handleAddedMfgs();
      }
      if (sectionName === sections.alternative) {
        handleAddAlternative();
      }
    }
  };

  const handleAddKeyword = () => {
    console.log('handling add keyword');
    if (newKeyword.trim() === '') return; // Ignore empty input

    const updatedKeywords = [
      ...selectedKeyWords,
      { name: newKeyword, isSelected: true },
    ];

    setSelectedKeyWords(updatedKeywords);
    setNewKeyword(''); // Reset the input field
  };

  const handleAddedMfgs = () => {
    if (newMfgsKeyWord.trim() === '') return; // Ignore empty input

    const updatedKeywords = [
      ...selectedMfgProcesses,
      { name: newMfgsKeyWord, isSelected: true },
    ];

    setSelectedMfgProcesses(updatedKeywords);
    setnewMfgsKeyWord(''); // Reset the input field
  };

  const handleAddAlternative = () => {
    if (newAlternativeKeyword.trim() === '') return; // Ignore empty input

    const updatedKeywords = [
      ...selectedAlternatives,
      { name: newAlternativeKeyword, isSelected: true },
    ];

    setSelectedAlternatives(updatedKeywords);
    setnewAlternativeKeyword(''); // Reset the input field
  };

  const onClickFilterBtn = () => {
    const openAll = !(openKeyWords && openMfgs && openAlternatives);
    setOpenKeyWords(openAll);
    setOpenMfgs(openAll);
    setOpenAlternatives(openAll);
  };

  return (
    <div className="matchory-search-container block max-h-[658px] w-[312px] bg-[#F8F8F8]">
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

      <div className="keyword-section items-center gap-[12px] p-[12px] border-b-[1px] border-[#CBD1E2]">
        <div className="section-opener  flex justify-between">
          <div className="right-divs flex items-center">
            <span className="font-inter font-[500] text-[14px] leading-[20px] mr-3">
              Keywords (
              {selectedKeyWords.filter((item) => item.isSelected).length})
            </span>
            <img
              className="infocircle pt-[4px] mr-3 cursor-pointer"
              src={infoCircle}
              alt="info"
            />
          </div>
          <div className="chevron-container">
            <img
              className="infocircle pt-[4px] cursor-pointer"
              src={openKeyWords ? chevronUp : chevronDown}
              alt="open"
              onClick={() => setOpenKeyWords(!openKeyWords)}
            />
          </div>
        </div>
        {openKeyWords && (
          <div className="keywords-list-container flex flex-col">
            <div className="sec-sub-header flex flex-row gap-[12px] mt-[12px] mb-[12px]">
              <div className="flex">
                <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#656B7C]">
                  Suggested Keywords
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
                          className={`whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                            item.isSelected ? 'bg-[#E0E7FF]' : 'bg-[#F3F4F6]'
                          }`}
                          onClick={() =>
                            handleBtnSelectKeyWords(idx, sections.keyword)
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
                  onKeyDown={(evt) => handleKeyDown(evt, sections.keyword)}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] placeholder:text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="manufacturing-process-section items-center gap-[12px] p-[12px] border-b-[1px] border-[#CBD1E2]">
        <div className="section-opener  flex justify-between">
          <div className="right-divs flex items-center">
            <span className="font-inter font-[500] text-[14px] leading-[20px] mr-3">
              Manufacturing processes (
              {selectedMfgProcesses.filter((item) => item.isSelected).length})
            </span>
            <img
              className="infocircle pt-[4px] mr-3 cursor-pointer"
              src={infoCircle}
              alt="info"
            />
          </div>
          <div className="chevron-container">
            <img
              className="infocircle pt-[4px] cursor-pointer"
              src={openMfgs ? chevronUp : chevronDown}
              alt="open"
              onClick={() => setOpenMfgs(!openMfgs)}
            />
          </div>
        </div>
        {openMfgs && (
          <div className="keywords-list-container flex flex-col">
            <div className="sec-sub-header flex flex-row gap-[12px] mt-[12px] mb-[12px]">
              <div className="flex">
                <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#656B7C]">
                  Suggested Mfg processes
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
                          className={`whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                            item.isSelected ? 'bg-[#E0E7FF]' : 'bg-[#F3F4F6]'
                          }`}
                          onClick={() =>
                            handleBtnSelectKeyWords(idx, sections.mfgprocess)
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
                  onChange={(e) => setnewMfgsKeyWord(e.target.value)}
                  onKeyDown={(evt) => handleKeyDown(evt, sections.mfgprocess)}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] placeholder:text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="alternative-keywords-section items-center gap-[12px] p-[12px] border-b-[1px] border-[#CBD1E2]">
        <div className="section-opener  flex justify-between">
          <div className="right-divs flex items-center">
            <span className="font-inter font-[500] text-[14px] leading-[20px] mr-3">
              Alternative keywords (
              {selectedAlternatives.filter((item) => item.isSelected).length})
            </span>
            <img
              className="infocircle pt-[4px] mr-3 cursor-pointer"
              src={infoCircle}
              alt="info"
            />
          </div>
          <div className="chevron-container">
            <img
              className="infocircle pt-[4px] cursor-pointer"
              src={openAlternatives ? chevronUp : chevronDown}
              alt="open"
              onClick={() => setOpenAlternatives(!openAlternatives)}
            />
          </div>
        </div>
        {openAlternatives && (
          <div className="keywords-list-container flex flex-col">
            <div className="sec-sub-header flex flex-row gap-[12px] mt-[12px] mb-[12px]">
              <div className="flex">
                <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#656B7C]">
                  Suggested alternative keywords
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
                          className={`whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                            item.isSelected ? 'bg-[#E0E7FF]' : 'bg-[#F3F4F6]'
                          }`}
                          onClick={() =>
                            handleBtnSelectKeyWords(idx, sections.alternative)
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
                  onChange={(e) => setnewAlternativeKeyword(e.target.value)}
                  onKeyDown={(evt) => handleKeyDown(evt, sections.alternative)}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] placeholder:text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
