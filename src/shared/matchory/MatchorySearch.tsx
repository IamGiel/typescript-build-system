import React, { CSSProperties, useEffect, useState } from 'react';
// import infoCircle from '../../assets/images/info-circle.svg';
// import chevronUp from '../../assets/images/chevron_up.svg';
// import chevronDown from '../../assets/images/chevron_down.svg';
import { sectionLabels } from './sampledata';
import { SectionOpener } from './resused-sections/SectionOpener';
import { WordlistSection } from './resused-sections/WordlistSection';

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

  const [sectionCounts, setSectionCounts] = useState({});

  const handleSelectedCount = (count) => {
    setCount(count);
  };

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
  }, [data, setSectionCounts]);

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
      const mapping = {
        [TAGNAME_KEYWORDS]: {
          value: newKeyword,
          setValue: setNewKeyword,
          setter: setSelectedKeyWords,
        },
        [TAGNAME_MANUFACTURING]: {
          value: newMfgsKeyWord,
          setValue: setNewMfgsKeyWord,
          setter: setSelectedMfgProcesses,
        },
        [TAGNAME_ALTERNATIVE]: {
          value: newAlternativeKeyword,
          setValue: setNewAlternativeKeyword,
          setter: setSelectedAlternatives,
        },
        [TAGNAME_LOCATIONS]: {
          value: newLocation,
          setValue: setNewLocation,
          setter: setSelectedLocations,
        },
        [TAGNAME_HSCODES]: {
          value: newHSCode,
          setValue: setNewHSCode,
          setter: setSelectedHSCodes,
        },
        [TAGNAME_BUYERS]: {
          value: newBuyer,
          setValue: setNewBuyer,
          setter: setSelectedBuyers,
        },
      };

      const { value, setValue, setter } = mapping[tagname];
      handleAddItem(tagname, value, setValue, setter);
    }
  };

  const handleAddItem = (tagname, newItem) => {
    if (newItem.trim() === '') return; // Ignore empty input

    const mapping = {
      [TAGNAME_KEYWORDS]: {
        selected: selectedKeyWords,
        setter: setSelectedKeyWords,
        valueSetter: setNewKeyword,
      },
      [TAGNAME_MANUFACTURING]: {
        selected: selectedMfgProcesses,
        setter: setSelectedMfgProcesses,
        valueSetter: setNewMfgsKeyWord,
      },
      [TAGNAME_ALTERNATIVE]: {
        selected: selectedAlternatives,
        setter: setSelectedAlternatives,
        valueSetter: setNewAlternativeKeyword,
      },
      [TAGNAME_LOCATIONS]: {
        selected: selectedLocations,
        setter: setSelectedLocations,
        valueSetter: setNewLocation,
      },
      [TAGNAME_HSCODES]: {
        selected: selectedHSCodes,
        setter: setSelectedHSCodes,
        valueSetter: setNewHSCode,
      },
      [TAGNAME_BUYERS]: {
        selected: selectedBuyers,
        setter: setSelectedBuyers,
        valueSetter: setNewBuyer,
      },
    };

    const { selected, setter, valueSetter } = mapping[tagname];

    const updatedItems = selected.length
      ? [...selected, { name: newItem, isSelected: true }]
      : [{ name: newItem, isSelected: true }];

    setter(updatedItems);
    valueSetter(''); // Reset the input field
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

  const handleSelectedCountChange = (sectionName, count) => {
    console.log('onchange sectionName ', sectionName);
    setSectionCounts((prevCounts) => ({
      ...prevCounts,
      [sectionName]: count,
    }));
  };

  const tagNamesMappings = [
    TAGNAME_KEYWORDS,
    TAGNAME_MANUFACTURING,
    TAGNAME_ALTERNATIVE,
    TAGNAME_LOCATIONS,
    TAGNAME_HSCODES,
    TAGNAME_BUYERS,
  ];

  const sectionMappings = {
    Keywords: {
      tagName: TAGNAME_KEYWORDS,
      subtitle: 'Suggested keywords',
      iterableItems: selectedKeyWords,
      sectionLabelName: sectionLabels.keyword,
      newWord: newKeyword,
      setNewWord: setNewKeyword,
      isSelectedCount: (count) =>
        handleSelectedCountChange(TAGNAME_KEYWORDS, count),
      isOpen: openKeyWords,
    },
    'Manufacturing Processes': {
      tagName: TAGNAME_MANUFACTURING,
      subtitle: 'Suggested keywords',
      iterableItems: selectedMfgProcesses,
      sectionLabelName: sectionLabels.mfgprocess,
      newWord: newMfgsKeyWord,
      setNewWord: setNewMfgsKeyWord,
      isSelectedCount: (count) =>
        handleSelectedCountChange(TAGNAME_MANUFACTURING, count),
      isOpen: openMfgs,
    },
    'Alternative keywords': {
      tagName: TAGNAME_ALTERNATIVE,
      subtitle: 'Suggested alternative keywords',
      iterableItems: selectedAlternatives,
      sectionLabelName: sectionLabels.alternative,
      newWord: newAlternativeKeyword,
      setNewWord: setNewAlternativeKeyword,
      isSelectedCount: (count) =>
        handleSelectedCountChange(TAGNAME_ALTERNATIVE, count),
      isOpen: openAlternatives,
    },
    Locations: {
      tagName: TAGNAME_LOCATIONS,
      subtitle: 'Suggested locations',
      iterableItems: selectedLocations,
      sectionLabelName: sectionLabels.locations,
      newWord: newLocation,
      setNewWord: setNewLocation,
      isSelectedCount: (count) =>
        handleSelectedCountChange(TAGNAME_LOCATIONS, count),
      isOpen: openLocations,
    },
    'HS-Codes': {
      tagName: TAGNAME_HSCODES,
      subtitle: 'Suggested HS-Codes',
      iterableItems: selectedHSCodes,
      sectionLabelName: sectionLabels.hscodes,
      newWord: newHSCode,
      setNewWord: setNewHSCode,
      isSelectedCount: (count) =>
        handleSelectedCountChange(TAGNAME_HSCODES, count),
      isOpen: openHSCodes,
    },
    Buyers: {
      tagName: TAGNAME_BUYERS,
      subtitle: 'Suggested buyers',
      iterableItems: selectedBuyers,
      sectionLabelName: sectionLabels.buyers,
      newWord: newBuyer,
      setNewWord: setNewBuyer,
      isSelectedCount: (count) =>
        handleSelectedCountChange(TAGNAME_BUYERS, count),
      isOpen: openBuyers,
    },
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
          <div className="tagnamesMappings-section-opener-mapping">
            {tagNamesMappings.map(
              (tagName) =>
                section.tagname === tagName && (
                  <SectionOpener
                    key={tagName}
                    section={section}
                    count={sectionCounts[tagName]}
                    getToggleSection={getToggleSection}
                    tooltipMsg={`${tagName}: tooltip msg passed here.`}
                  />
                )
            )}
          </div>

          <div className="worldist-section-mapping">
            {Object.entries(sectionMappings).map(
              ([sectionName, sectionConfig]) =>
                section.sectionName === sectionName && (
                  <WordlistSection
                    key={sectionName}
                    sectionTagName={sectionConfig.tagName}
                    subtitle={sectionConfig.subtitle}
                    iterableItems={sectionConfig.iterableItems}
                    sectionLabelName={sectionConfig.sectionLabelName}
                    clickHandler={handleBtnSelectKeyWords}
                    newWord={sectionConfig.newWord}
                    setNewWord={sectionConfig.setNewWord}
                    onEnter={handleKeyDown}
                    onButtonClick={onButtonRequest}
                    isSelectedCount={sectionConfig.isSelectedCount}
                    isOpen={sectionConfig.isOpen}
                    setIsOpen={(isOpen) => sectionConfig.setOpen(isOpen)}
                  />
                )
            )}
          </div>
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
