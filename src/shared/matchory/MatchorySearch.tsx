import React, { CSSProperties, useEffect, useState } from 'react';
import infoCircle from '../../assets/images/info-circle.svg';
import chevronUp from '../../assets/images/chevron_up.svg';
import chevronDown from '../../assets/images/chevron_down.svg';
import { sectionLabels } from './sampledata';
import ReusableSection from './ReusableSection';

type Addword = {
  name: string;
  isSelected: boolean;
};

type MatchoryData = {
  sectionName: string;
  suggested: string;
  preselectedItems: Addword[];
  tagname: string;
  isOPen: boolean;
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

  const TAGNAME_KEYWORDS = 'TAGNAME_KEYWORDS';
  const TAGNAME_MANUFACTURING = 'TAGNAME_MANUFACTURING';
  const TAGNAME_ALTERNATIVE = 'TAGNAME_ALTERNATIVE';
  const TAGNAME_LOCATIONS = 'TAGNAME_LOCATIONS';
  const TAGNAME_HSCODES = 'TAGNAME_HSCODES';
  const TAGNAME_BUYERS = 'TAGNAME_BUYERS';

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((item) => {
        console.log('this is item in useeffect ', item);
        const { tagname, preselectedItems } = item;
        switch (tagname) {
          case TAGNAME_KEYWORDS:
            setSelectedKeyWords(preselectedItems);
            break;
          case TAGNAME_MANUFACTURING:
            setSelectedMfgProcesses(preselectedItems);
            break;
          case TAGNAME_ALTERNATIVE:
            setSelectedAlternatives(preselectedItems);
            break;
          case TAGNAME_LOCATIONS:
            setSelectedLocations(preselectedItems);
            break;
          case TAGNAME_HSCODES:
            setSelectedHSCodes(preselectedItems);
            break;
          case TAGNAME_BUYERS:
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
      if (tagname === TAGNAME_KEYWORDS) {
        handleAddItem(tagname, newKeyword, setNewKeyword, setSelectedKeyWords);
      }
      if (tagname === TAGNAME_MANUFACTURING) {
        handleAddItem(
          tagname,
          newMfgsKeyWord,
          setNewMfgsKeyWord,
          setSelectedMfgProcesses
        );
      }
      if (tagname === TAGNAME_ALTERNATIVE) {
        handleAddItem(
          tagname,
          newAlternativeKeyword,
          setNewAlternativeKeyword,
          setSelectedAlternatives
        );
      }

      if (tagname === TAGNAME_LOCATIONS) {
        handleAddItem(
          tagname,
          newLocation,
          setNewLocation,
          setSelectedLocations
        );
      }

      if (tagname === TAGNAME_HSCODES) {
        handleAddItem(tagname, newHSCode, setNewHSCode, setSelectedHSCodes);
      }
      if (tagname === TAGNAME_BUYERS) {
        handleAddItem(tagname, newBuyer, setNewBuyer, setSelectedBuyers);
      }
    }
  };

  const handleAddItem = (tagname, newItem) => {
    if (newItem.trim() === '') return; // Ignore empty input

    if (tagname === TAGNAME_KEYWORDS) {
      const updatedKeywords = selectedKeyWords.length
        ? [...selectedKeyWords, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedKeyWords(updatedKeywords);
      setNewKeyword(''); // Reset the input field
    }

    if (tagname === TAGNAME_MANUFACTURING) {
      const updatedMfgProcesses = selectedMfgProcesses.length
        ? [...selectedMfgProcesses, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedMfgProcesses(updatedMfgProcesses);
      setNewMfgsKeyWord(''); // Reset the input field setNewMfgsKeyWord
    }
    if (tagname === TAGNAME_ALTERNATIVE) {
      const updatedAlternatives = selectedAlternatives.length
        ? [...selectedAlternatives, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedAlternatives(updatedAlternatives);
      setNewAlternativeKeyword(''); // Reset the input field
    }
    if (tagname === TAGNAME_LOCATIONS) {
      const updatedLocations = selectedLocations.length
        ? [...selectedLocations, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedLocations(updatedLocations);
      setNewLocation(''); // Reset the input field
    }
    if (tagname === TAGNAME_HSCODES) {
      const updatedHScodes = selectedHSCodes.length
        ? [...selectedHSCodes, { name: newItem, isSelected: true }]
        : [{ name: newItem, isSelected: true }];

      setSelectedHSCodes(updatedHScodes);
      setNewHSCode(''); // Reset the input field
    }
    if (tagname === TAGNAME_BUYERS) {
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

  // will handle reset, cancel, search/filter buttons
  const onButtonRequest = (evt) => {
    console.log('evt ', evt.target.type);
  };

  const getToggleSection = (sectionName) => {
    switch (sectionName) {
      case TAGNAME_KEYWORDS:
        return setOpenKeyWords(!openKeyWords);
      case TAGNAME_MANUFACTURING:
        return setOpenMfgs(!openMfgs);
      case TAGNAME_ALTERNATIVE:
        return setOpenAlternatives(!openAlternatives);

      case TAGNAME_LOCATIONS:
        return setOpenLocations(!openLocations);
      case TAGNAME_HSCODES:
        return setOpenHSCodes(!openHSCodes);
      case TAGNAME_BUYERS:
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
          {/* <pre>{JSON.stringify(section, null, 4)}</pre> */}
          <div className="section-opener flex justify-between">
            <div className="right-divs flex items-center">
              <span className="font-inter font-[500] text-[14px] leading-[20px] mr-3">
                {section.sectionName}
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
                  section.isOpen = !section.isOpen;
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
            <ReusableSection
              sectionTagName={TAGNAME_KEYWORDS}
              subtitle="Suggested keywords"
              iterableItems={selectedKeyWords}
              sectionLabelName={sectionLabels.keyword}
              clickHandler={handleBtnSelectKeyWords}
              newWord={newKeyword}
              setNewWord={setNewKeyword}
              onEnter={handleKeyDown}
              onButtonClick={onButtonRequest}
            />
          )}

          {section.sectionName === 'Manufacturing Processes' && openMfgs && (
            <ReusableSection
              sectionTagName={TAGNAME_MANUFACTURING}
              subtitle="Suggested keywords"
              iterableItems={selectedMfgProcesses}
              sectionLabelName={sectionLabels.mfgprocess}
              clickHandler={handleBtnSelectKeyWords}
              newWord={newMfgsKeyWord}
              setNewWord={setNewMfgsKeyWord}
              onEnter={handleKeyDown}
            />
          )}

          {section.sectionName === 'Alternative keywords' &&
            openAlternatives && (
              <ReusableSection
                sectionTagName={TAGNAME_ALTERNATIVE}
                subtitle="Suggested alternative keywords"
                iterableItems={selectedAlternatives}
                sectionLabelName={sectionLabels.alternative}
                clickHandler={handleBtnSelectKeyWords}
                newWord={newAlternativeKeyword}
                setNewWord={setNewAlternativeKeyword}
                onEnter={handleKeyDown}
              />
            )}

          {section.sectionName === 'Locations' && openLocations && (
            <ReusableSection
              sectionTagName={TAGNAME_LOCATIONS}
              subtitle="Suggested locations"
              iterableItems={selectedLocations}
              sectionLabelName={sectionLabels.locations}
              clickHandler={handleBtnSelectKeyWords}
              newWord={newLocation}
              setNewWord={setNewLocation}
              onEnter={handleKeyDown}
            />
          )}

          {section.sectionName === 'HS-Codes' && openHSCodes && (
            <ReusableSection
              sectionTagName={TAGNAME_HSCODES}
              subtitle="Suggested HS-Codes"
              iterableItems={selectedHSCodes}
              sectionLabelName={sectionLabels.hscodes}
              clickHandler={handleBtnSelectKeyWords}
              newWord={newHSCode}
              setNewWord={setNewHSCode}
              onEnter={handleKeyDown}
            />
          )}

          {section.sectionName === 'Buyers' && openBuyers && (
            <ReusableSection
              sectionTagName={TAGNAME_BUYERS}
              subtitle="Suggested buyers"
              iterableItems={selectedBuyers}
              sectionLabelName={sectionLabels.buyers}
              clickHandler={handleBtnSelectKeyWords}
              newWord={newBuyer}
              setNewWord={setNewBuyer}
              onEnter={handleKeyDown}
            />
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
