import React, { useState } from 'react';
import infoCircle from '../../assets/images/info-circle.svg';
import chevronUp from '../../assets/images/chevron_up.svg';
import chevronDown from '../../assets/images/chevron_down.svg';

type MatchorySearch = {
  title: 'Search' | 'Filter';
};

export const MatchorySearch = ({ title }: MatchorySearch) => {
  const [openKeyWords, setOpenKeyWords] = useState(false);
  const [selectedKeyWords, setSelectedKeyWords] = useState([]);
  const [selectedMfgProcesses, setSelectedMfgProcesses] = useState([]);
  const [selectedAlternatives, setSelectedAlternatives] = useState([]);

  const handleBtnSelectKeyWords = (index, sectionName) => {
    const sectionStateMap = {
      [sections.keyword]: [selectedKeyWords, setSelectedKeyWords],
      [sections.mfgprocess]: [selectedMfgProcesses, setSelectedMfgProcesses],
      [sections.alternative]: [selectedAlternatives, setSelectedAlternatives],
    };

    const [selectedState, setSelectedState] = sectionStateMap[sectionName];

    if (selectedState.includes(index)) {
      setSelectedState(selectedState.filter((item) => item !== index));
    } else {
      setSelectedState([...selectedState, index]);
    }
  };

  const sections = {
    keyword: 'KEYWORDS',
    alternative: 'ALTERNATIVE_KEYWORDS',
    mfgprocess: 'MANUFACTURING_PROCESSES',
  };

  const keywords = [
    'corn',
    'bran',
    'breakfast food',
    'grain',
    'oats',
    'rice',
    'rye',
    'barley',
  ];

  const mfgs = ['cereal', 'grass', 'durum', 'gluten', 'semulina', 'spelt'];

  const alternatives = [
    'Harvesting',
    'Storage',
    'Cleaning',
    'Conditioning',
    'Bending',
    'Grinding',
    'Scrap Phase',
    'Sieving',
    'Packing',
    'Destoner',
    'Trieur',
  ];

  return (
    <div className="matchory-search-container flex flex-col min-h-[658px] w-[312px] bg-[#F8F8F8]">
      <div className="title-section flex p-[12px] h-[56px] text-[16px] font-[700] border-b-[1px] border-[#CBD1E2]">
        {title}
      </div>
      <div className="keyword-section items-center gap-[12px] p-[12px] border-b-[1px] border-[#CBD1E2]">
        <div className="section-opener  flex justify-between">
          <div className="right-divs flex items-center">
            <span className="font-inter font-[500] text-[14px] leading-[20px] mr-3">
              Keywords ({selectedKeyWords.length})
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
            {keywords &&
              keywords.map((items, idx) => (
                <div className="button-container flex gap-[12px]" key={idx}>
                  <button
                    className={`whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                      selectedKeyWords.includes(idx)
                        ? 'bg-[#E0E7FF]'
                        : 'bg-[#F3F4F6]'
                    }`}
                    onClick={() =>
                      handleBtnSelectKeyWords(idx, sections.keyword)
                    }
                  >
                    {items}
                  </button>
                </div>
              ))}
          </div>
          <div className="input-keywords">
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                placeholder="Add a keyword"
                autoComplete="given-name"
                className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="manufacturing-process-section items-center gap-[12px] p-[12px] border-b-[1px] border-[#CBD1E2]">
        <div className="section-opener  flex justify-between">
          <div className="right-divs flex items-center">
            <span className="font-inter font-[500] text-[14px] leading-[20px] mr-3">
              Manufacturing processes ({selectedMfgProcesses.length})
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
            {mfgs &&
              mfgs.map((items, idx) => (
                <div className="button-container flex gap-[12px]" key={idx}>
                  <button
                    className={`whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                      selectedMfgProcesses.includes(idx)
                        ? 'bg-[#E0E7FF]'
                        : 'bg-[#F3F4F6]'
                    }`}
                    onClick={() =>
                      handleBtnSelectKeyWords(idx, sections.mfgprocess)
                    }
                  >
                    {items}
                  </button>
                </div>
              ))}
          </div>
          <div className="input-keywords">
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                placeholder="Add a keyword"
                autoComplete="given-name"
                className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="alternative-keywords-section items-center gap-[12px] p-[12px] border-b-[1px] border-[#CBD1E2]">
        <div className="section-opener  flex justify-between">
          <div className="right-divs flex items-center">
            <span className="font-inter font-[500] text-[14px] leading-[20px] mr-3">
              Alternative keywords ({selectedAlternatives.length})
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
            {alternatives &&
              alternatives.map((items, idx) => (
                <div className="button-container flex gap-[12px]" key={idx}>
                  <button
                    className={`whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                      selectedAlternatives.includes(idx)
                        ? 'bg-[#E0E7FF]'
                        : 'bg-[#F3F4F6]'
                    }`}
                    onClick={() =>
                      handleBtnSelectKeyWords(idx, sections.alternative)
                    }
                  >
                    {items}
                  </button>
                </div>
              ))}
          </div>
          <div className="input-keywords">
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                placeholder="Add a keyword"
                autoComplete="given-name"
                className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
