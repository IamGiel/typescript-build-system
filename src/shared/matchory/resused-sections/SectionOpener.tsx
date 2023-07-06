import React from 'react';
import infoCircle from '../../../assets/images/info-circle.svg';
import chevronUp from '../../../assets/images/chevron_up.svg';
import chevronDown from '../../../assets/images/chevron_down.svg';

export const SectionOpener = ({
  section,
  count,
  getToggleSection,
  tooltipMsg,
}) => {
  // console.log(section)
  // console.log(count)
  // console.log(isOpen)

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
    <div className="section-opener flex justify-between">
      <div className="right-divs flex items-center">
        <span className="font-inter font-[500] text-[14px] leading-[20px] mr-3">
          {section.sectionName} <span>({count})</span>
        </span>
        <div className="tooltip-section">{tooltip(tooltipMsg)}</div>
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
  );
};
