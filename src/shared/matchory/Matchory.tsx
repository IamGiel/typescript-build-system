import React from 'react';
import Logo from '../../assets/images/matchory_logo.svg'; // Replace '../assets/logo.svg' with the correct path to your SVG file
import { MatchorySearch } from './MatchorySearch';
import { MatchoryPills } from './MatchoryPills';
import { MatchoryMap } from './MatchoryMap';

// render the matchory Search, filter, keywords and map components
export const Matchory = () => {
  return (
    <div className="matchory-parent-container">
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
            <MatchorySearch title="Search" />
          </div>
          {/* filter */}
          <div className="filter-section-container">
            <MatchorySearch title="Filter" />
          </div>
        </div>
        <div className="right-results-section">
          <div className="search-pills-seciton">
            <MatchoryPills />
          </div>
          <div className="map-container-seciton">
            <MatchoryMap />
          </div>
        </div>
      </div>
    </div>
  );
};
