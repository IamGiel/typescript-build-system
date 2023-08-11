import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { Fragment, useEffect, useState } from 'react';
import { Vector } from '../../../assets/images/Vector';
import { MagnifyingGlass } from '../../../assets/images/MagnifyingGlass';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

export const PepList = ({ peplist }) => {
  const itemsPerPage = 10; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const iconColor = '#BAC1D8';
  const numItems = [5, 10, 15, 20];

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  useEffect(() => {
    console.log('peplist ', peplist);
  }, []);
  return (
    <div className="pep-list-container flex flex-col">
      <div className="filter-search-row grid grid-cols-1  mb-[12px] px-[12px]">
        <div className="showing-num-list py-2 col-span-1 flex flex-row gap-[12px] grid grid-cols-4">
          <div className="total grid grid-cols-2 col-span-2 w-[400px]">
            <div className="displaying-page p-[6px] col-span-1">
              <div className="display-amt">
                <span className="font-[400] text-[16px] text-[#656B7C]">
                  Displaying
                </span>{' '}
                <span className="font-[700] text-[16px] text-[#111827]">
                  10
                </span>{' '}
                <span className="font-[400] text-[16px] text-[#656B7C]">
                  of
                </span>{' '}
                <span className="font-[700] text-[16px] text-[#111827]">
                  421
                </span>
              </div>
            </div>
            <div className="filter-header-display  border-2 border-[#8D8D8E] rounded-[6px] w-[fit-content] p-[6px] flex flex-row justify-center gap-[12px] col-span-1">
              <p className="result-total font-[600] text-[#6B6B6F] text-[16px]">
                10 results
              </p>
              <div className="chevron-icon flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex items-center text-gray-400">
                      <span className="sr-only">Open options</span>
                      <Vector height={'15px'} width={'15px'} fill={'#6B6B6F'} />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {numItems.map((item, idx) => (
                          <Menu.Item key={idx}>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                {item} results
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div className="filler col-span-1"></div>
          <div className="filter-header-search  border border-slate-300 rounded p-[6px] flex flex-row justify-center gap-[12px] col-span-1">
            <span className="chevron-icon flex items-center">
              <MagnifyingGlass
                fill={'none'}
                height={'20px'}
                width={'20px'}
                stroke={iconColor}
              />
            </span>
            <input
              className="result-total w-[75px] flex flex-grow focus:outline-none focus-visible:outline-none"
              placeholder="search"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 bg-[#F9FAFB] border border-[#E7E9ED]">
        <div className="col-span-1 text-left py-2 px-[12px] font-inter font-[500] text-[16px] text-[#6B7280]">
          PRIMARY NAME
        </div>
        <div className="col-span-1 text-left py-2 px-[12px] font-inter font-[500] text-[16px] text-[#6B7280]">
          ROLE
        </div>
        <div className="col-span-1 text-left py-2 px-[12px] font-inter font-[500] text-[16px] text-[#6B7280]">
          NATIONALITY
        </div>
        <div className="col-span-3 text-left py-2 px-[12px] font-inter font-[500] text-[16px] text-[#6B7280] flex items-center gap-[12px]">
          RISK TYPE{' '}
          <span className="info-circle-div cursor-pointer">
            <InformationCircleIcon
              fill={'none'}
              height={'16px'}
              width={'16px'}
            />
          </span>
        </div>
      </div>
      <div className="peplist-iterated">
        {peplist &&
          peplist
            .slice(0, currentPage * itemsPerPage) // Slice the array based on current page and itemsPerPage
            .map((pep, idx) => (
              <div
                className="item-container grid grid-cols-6 border-t border-slate-300"
                key={idx}
              >
                <div className="peplist-item col-span-1 text-left py-2 px-[12px]">
                  {pep.firstName} {pep.lastName}
                </div>
                <div className="peplist-item col-span-1 text-left py-2 px-[12px]">
                  {pep.company.department}
                </div>
                <div className="peplist-item col-span-1 text-left py-2 px-[12px]">
                  {pep.company.address.city}
                </div>
                <div className="peplist-item col-span-1 text-left py-2 px-[12px] max-w-[400px] overflow-hidden flex flex-row gap-[12px]">
                  {[...Array(3)].map((item, idx) => (
                    <span key={idx}>{pep.username}</span>
                  ))}
                </div>
              </div>
            ))}
      </div>
      {currentPage * itemsPerPage < peplist.length && ( // Show Load More button conditionally
        <div className="flex justify-center mt-4">
          <button
            className="mx-auto block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
