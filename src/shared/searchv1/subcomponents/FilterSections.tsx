import React, { useEffect } from 'react';
import { Dropdown } from './Dropdown';

export const FilterSections = ({
  filterProp,
  filternameProp,
  onCheckedItemsChange,
}) => {
  useEffect(() => {
    console.log('filter prop: ', filterProp);
    console.log('filter filternameProp: ', filternameProp);
  }, []);

  const handleOnCheckedItems = (checkedItems) => {
    console.log('handlechecked items ', checkedItems);
    onCheckedItemsChange(checkedItems);
  };

  return (
    <div className="filter-section-container flex flex-col lg:flex-col  sm:flex-row gap-[12px]">
      <div className="filter-item flex flex-col justify-center cursor-pointer font-inter text-[16px] font-[500] text-slate-700 border border-slate-200 rounded p-[12px]">
        <Dropdown
          labelProp={filternameProp}
          dataProp={filterProp}
          onCheckedItemsChange={handleOnCheckedItems}
        />
      </div>
    </div>
  );
};
