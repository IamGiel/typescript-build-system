import React from 'react';
import { MultiSelect } from './MultiSelect';

export const LadderBody = () => {
  return (
    <div className="ladder-body-container flex flex-col lg:flex-row my-[12px] p-[24px] gap-[24px]">
      <div className="lb-section flex flex-col gap-[12px] rounded border border-slate-300 p-[12px]">
        <div className="list-of-matches-section flex flex-col gap-[12px]">
          <div className="ts-header-title">
            <span>Upcoming Event Proposals</span>
          </div>
          <div className="list-container flex flex-col gap-[12px]">
            <div className="lsitem-name">Wednesday Claytons Matchup</div>
          </div>
        </div>
        <div>Available players today</div>
      </div>
      <div className="lb-section flex flex-grow flex-col rounded border border-slate-300 p-[12px]">
        <div className="ts-header-title">
          <span>Your Availability</span>
        </div>
        <div className="list-container flex flex-col gap-[12px]">
          <div className="lsitem-name">
            <MultiSelect />
          </div>
        </div>
      </div>
    </div>
  );
};
