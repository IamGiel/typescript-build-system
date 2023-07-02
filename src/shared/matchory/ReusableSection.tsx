import React from 'react';

const ReusableSection = ({
  sectionTagName,
  subtitle,
  iterableItems,
  clickHandler,
  sectionLabelName,
  newWord,
  setNewWord,
  onEnter,
}) => {
  return (
    <div className="keywords-list-container flex flex-col">
      <div className="sec-sub-header flex flex-row gap-[12px] mt-[12px] mb-[12px]">
        <div className="flex">
          <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#656B7C]">
            {subtitle}
          </span>
        </div>
        <div className="flex">
          <span className="font-inter font-[500] text-[14px] leading-[20px] text-[#5650D6]">
            Reset
          </span>
        </div>
      </div>

      <div className="keywords-lists flex flex-wrap gap-[12px]">
        {iterableItems &&
          iterableItems.map(
            (item, idx) =>
              item.isSelected && (
                <div
                  className="button-container flex gap-[12px] flex-shrink-0"
                  key={idx}
                >
                  <button
                    className={`max-w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter rounded-[12px] px-[12px] py-[2px] ${
                      item.isSelected ? 'bg-[#E0E7FF]' : 'bg-[#F3F4F6]'
                    }`}
                    title={item.name}
                    onClick={() => clickHandler(idx, sectionLabelName)}
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
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={(evt) => onEnter(evt, sectionTagName)}
            autoComplete="given-name"
            className="block w-full rounded-md border-1 px-3.5 py-2 text-[#878EA5] h-[38px] placeholder:text-[14px] font-[500] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-[#878EA5] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};

export default ReusableSection;
