import React, { useState } from 'react';
import { XIcon } from '../../assets/images/xicon';

type ISearchWord = {
  term: string;
  isSelected: boolean;
};

type ISearches = {
  searches: ISearchWord[];
};

export const MatchorySearch = () => {
  const [searchWords, setSearchWords] = useState<ISearches>([]);

  const onEnterSearch = (event) => {
    event.preventDefault();
    const newWord = {
      name: event.target.elements.keyword.value.trim(),
      isSelected: true,
    };
    if (newWord !== '') {
      setSearchWords([...searchWords, newWord]);
      event.target.reset();
    }
  };

  const onClickPill = (item) => {
    console.log('item here ', item);
  };

  return (
    <div className="matchory-search-container">
      <form className="input-container" onSubmit={onEnterSearch}>
        <input
          className="mathchory-search-input-field w-[100%] px-[12px] h-[38px] border border-[#CBD1E2] rounded-[6px] text-[14px] font-inter font-[500] placeholder:text-[14px] placeholder:font-inter placeholder:font-[500] focus:border-slate-300 focus:ring-slate-300 focus:outline-none"
          type="text"
          name="keyword"
          placeholder="Add required keywords here"
        />
        {/* <button type="submit">Submit</button> */}
      </form>
      <div className="search-keywords-container">
        <div className="pills-here flex gap-[12px] my-[12px] p-[12px]">
          {searchWords.map((item, idx) => {
            return (
              <div
                className="result-header-keywords-lists flex flex-wrap gap-[12px]"
                key={idx}
              >
                <div className="result-header-button-container flex gap-[12px] flex-shrink-0">
                  <button
                    className={`btn-pill flex items-center ${
                      item.name.length > 12
                        ? 'max-w-[119px]'
                        : 'w-[fit-content]'
                    } rounded-[12px] px-[12px] py-[2px] flex p-[5px] ${
                      item.isSelected
                        ? 'bg-[#DDDCF7] w-[100px]'
                        : 'bg-[#EEF0F5] w-[100px]'
                    }`}
                    title={item.name}
                    onClick={() => onClickPill(item.name, 'RESULT-SECTION')}
                  >
                    <span
                      className={` name-span flex overflow-hidden overflow-ellipsis whitespace-nowrap text-[#3730A3] text-[14px] font-[500] font-inter`}
                    >
                      {item.name}
                    </span>
                    {item.isSelected && (
                      <span className="xicon-span flex items-center my-[2px] mx-[5px]">
                        <XIcon height={'16'} width={'16'} fill={'#8E8AE4'} />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
