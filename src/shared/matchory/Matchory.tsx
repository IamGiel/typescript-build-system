import React from 'react';
import Logo from '../../assets/images/matchory_logo.svg'; // Replace '../assets/logo.svg' with the correct path to your SVG file

// render the matchory Search, filter, keywords and map components
export const Matchory = () => {
  return (
    <div className="matchory-parent-container">
      <div className="titleHeader flex flex-row font-[700] font-[inter] text-left text-[#111827] text-[30px]">
        SUPPLEIR SEARCH
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
    </div>
  );
};
