import React from 'react';
import { LadderHeader } from './subcomponents/LadderHeader';
import { LadderBody } from './subcomponents/LadderBody';
import { LadderFooter } from './subcomponents/LadderFooter';

export const Ladder = () => {
  return (
    // eslint-disable-next-line prettier/prettier
    <div className="ladder-container flex flex-col bg-slate-200 m-auto p-[24px] w-90vw sm:w-[90%] gap-[12px]">
      <div className="ladder-Header-section">
        <LadderHeader />
      </div>
      <div className="ladder-body-section">
        <LadderBody />
      </div>
      <div className="ladder-footer-section">
        <LadderFooter />
      </div>
    </div>
  );
};
