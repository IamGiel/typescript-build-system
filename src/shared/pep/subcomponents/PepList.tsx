import {
  ArchiveBoxIcon,
  ArrowDownTrayIcon,
  ArrowRightIcon,
  BookmarkIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { Vector } from '../../../assets/images/Vector';
import { MagnifyingGlass } from '../../../assets/images/MagnifyingGlass';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ProfileICon } from '../../../assets/images/ProfileIcon';
import { ThreeDotsMenuIcon } from '../../../assets/images/ThreeDotsMenuIcon';

export const PepList = ({ peplist }) => {
  const itemsPerPage = 10; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const iconColor = '#BAC1D8';
  const showMenus = [
    { value: '5', label: '5', icon: null },
    { value: '10', label: '10', icon: null },
    { value: '15', label: '15', icon: null },
    { value: peplist.length, label: 'show all', icon: null },
  ];
  const listMenus = [
    {
      value: 'delete',
      label: 'Delete item',
      icon: <ArchiveBoxIcon height={'15px'} width={'15px'} />,
    },
    {
      value: 'save',
      label: 'Save item',
      icon: <BookmarkIcon height={'15px'} width={'15px'} />,
    },
    {
      value: 'dowload',
      label: 'Download item',
      icon: <ArrowDownTrayIcon height={'15px'} width={'15px'} />,
    },
  ];
  const riskTypeMenus = [
    {
      value: 'PEP',
      label: 'PEP',
      icon: <ProfileICon height={'15px'} width={'15px'} />,
    },
    {
      value: 'PEP1',
      label: 'PEP1',
      icon: <ProfileICon height={'15px'} width={'15px'} />,
    },
    {
      value: 'PEP2',
      label: 'PEP2',
      icon: <ProfileICon height={'15px'} width={'15px'} />,
    },
  ];

  const handleMenuItemSelect = (value) => {
    // Handle the selected menu item value
    console.log('Selected value:', value);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  useEffect(() => {
    console.log('peplist ', peplist);
  }, []);

  const peplistStyles = {
    subseqCols: 'text-[14px] text-[#111827] font-[400]',
  };

  const menuItemDiv = (menuItems, icon: ReactElement) => {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center text-gray-400">
            <span className="sr-only">Open options</span>
            {icon}
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
              {menuItems.map((item, idx) => (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <Link
                      href={item.value}
                      className={
                        classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        ) + ' flex items-center gap-[5px]'
                      }
                      onClick={() => handleMenuItemSelect(item.value)} // Call the handler
                    >
                      <span>{item.icon}</span>
                      {item.label} results
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };

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
                {menuItemDiv(
                  showMenus,
                  <Vector height={'15px'} width={'15px'} fill={'#6B6B6F'} />
                )}
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
          <div className="info-circle-div flex items-center gap-[5px] cursor-pointer">
            {menuItemDiv(
              riskTypeMenus,
              <InformationCircleIcon
                height={'24px'}
                width={'24px'}
                fill={'white'}
              />
            )}
          </div>
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
                <div
                  className="name-column text-[#5650D6] font-[500] text-[14px] peplist-item col-span-1 text-left py-2 px-[12px] overflow-hidden whitespace-normal truncate w-[100%]"
                  title={`${pep.firstName} ${pep.lastName}`}
                >
                  {pep.firstName} {pep.lastName} pokaiwhenuakitnatahu some long
                  lastnamewithoutspacing
                </div>
                <div
                  className={`role-column ${peplistStyles.subseqCols} peplist-item col-span-1 text-left py-2 px-[12px] overflow-hidden whitespace-normal truncate w-[100%]`}
                  title={`${pep.company.department}`}
                >
                  {pep.company.department} Mr director VP CEO of something
                  something SOMEONE WITH A TITLE OF BLAH
                </div>
                <div
                  className={`nationality-column ${peplistStyles.subseqCols} peplist-item col-span-1 text-left py-2 px-[12px] overflow-hidden whitespace-normal truncate w-[100%]`}
                  title={`${pep.company.address.city}`}
                >
                  {pep.company.address.city}{' '}
                  Taumatawhakatangihangakoauauotamateaturipukakapiki-maungahoronukupokaiwhenuakitnatahu:
                </div>
                <div
                  className={`risktype-column ${peplistStyles.subseqCols} peplist-item flex items-center col-span-2 text-left py-2 px-[12px] max-w-[fit-content]`}
                >
                  <div className="flex flex-wrap gap-[12px]">
                    {[...Array(3)].map((item, idx) => (
                      <span
                        key={idx}
                        className={`pills-cols flex items-center gap-[5px] py-[2px] px-[10px] rounded-[10px] inline-block overflow-hidden whitespace-normal ${
                          idx === 0
                            ? 'bg-[#FEE2E2] text-[#553F17]'
                            : idx === 1
                            ? 'bg-[#DDDCF7] text-[#39358F]'
                            : idx === 2
                            ? 'bg-[#FFF2DA] text-[#553F17]'
                            : 'bg-[#FEE2E2] text-[#991B1B]'
                        }`}
                        title={pep.username}
                      >
                        <ProfileICon
                          height={'12px'}
                          width={'12px'}
                          stroke={2}
                          fill={
                            idx === 0
                              ? 'rgb(235,87,88)'
                              : idx === 1
                              ? 'rgb(86,80,214)'
                              : idx === 2
                              ? 'rgb(255,190,69)'
                              : '#FEE2E2'
                          }
                        />{' '}
                        {pep.username}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="view-details-column flex flex-row items-center justify-end gap-[10px]">
                  <div className="view-dets-btn">
                    <button className="btn-div-view-dets flex items-center gap-[5px] py-[7px] px-[11px] h-[40px] border border-[#CBD1E2] rounded-[4px] text-[12px] text-[#444752]">
                      View Details
                      <ArrowRightIcon
                        height={'15px'}
                        width={'15px'}
                        stroke={2}
                        fill={'rgba(107, 107, 111, 1)'}
                      />
                    </button>
                  </div>
                  <div className="threedots">
                    {menuItemDiv(
                      listMenus,
                      <ThreeDotsMenuIcon
                        height={'15px'}
                        width={'15px'}
                        stroke={2}
                        fill={'rgb(107,107,111)'}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
      {currentPage * itemsPerPage < peplist.length && ( // Show Load More button conditionally
        <div className="flex flex-row items-center my-4 h-[40px]">
          <button
            className="flex items-center gap-[10px] mx-auto py-2 px-4 text-[#7D838F] text-[14px] font-[500]"
            onClick={handleLoadMore}
          >
            Load More
            <span>
              <ChevronDownIcon height={'15px'} width={'15px'} stroke={2} />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
