import { endOfMonth, format, getDay, isToday, startOfMonth } from 'date-fns';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  IoCalendarClearSharp,
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoCheckmarkSharp,
  IoToday,
} from 'react-icons/io5';

import { useLilius } from 'use-lilius';
import { Dropdown, ScheduleForm } from './ScheduleForm';
import { CheckIcon, NoSymbolIcon } from '@heroicons/react/20/solid';

export const MultiSelectCalendar: React.FC = ({ proposals }) => {
  const {
    calendar,
    inRange,
    isSelected,
    selected,
    toggle,
    viewing,
    viewNextMonth,
    viewPreviousMonth,
    viewToday,
  } = useLilius();

  const styles = {
    input: null,
    placeholder: null,
    icon: null,
    popContent: null,
    popBody: null,
    navigationContainer: null,
    navigationLabel: null,
    navigationButton: null,
    calendarContainer: null,
    dayLabelContainer: null,
    dayLabel: null,
    calendarMatrixContainer: null,
    calendarMatrixDay: null,
    divider: null,
    todayButtonGroup: null,
    todayButton: null,
  };
  const listRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [dayModalStates, setDayModalStates] = useState({});
  const [availabilityType, setAvailabilityType] = useState({
    status: 'NOT_AVAILABLE',
  });
  const [previouslySelected, setPreviouslySelected] = useState([]);
  const [visibleTagCount, setVisibleTagCount] = useState(0);
  const shouldRecountTags =
    previouslySelected?.length || selected.length > visibleTagCount;

  const buttonStyles =
    'text-[#533F24] font-[500] px-2 py-1 rounded bg-[#9BC96B]';

  useEffect(() => {
    setPreviouslySelected(selected);
  }, [selected]);

  // We only want to show as many selected dates as will fit
  // within the pseudo input field. We track how many that is so
  // that we can render a +{leftover} tag at the end of the list
  // if we need to.
  useLayoutEffect(() => {
    if (shouldRecountTags) {
      const COUNT_TAG_WIDTH = 50;

      let newVisibleTagCount = selected.length;

      if (listRef.current) {
        const tags = listRef.current.querySelectorAll('[data-tag]');
        const containerBounds = listRef.current.getBoundingClientRect();

        for (let i = 0; i < tags.length; i += 1) {
          const tag = tags[i];
          const tagBounds = tag.getBoundingClientRect();

          if (tagBounds.right > containerBounds.right) {
            const previousTag = tags[i - 1];
            const previousTagBounds = previousTag.getBoundingClientRect();

            if (
              previousTagBounds.right >
              containerBounds.right - COUNT_TAG_WIDTH
            ) {
              newVisibleTagCount = i - 1;
            } else {
              newVisibleTagCount = i;
            }

            break;
          }
        }
      }

      setVisibleTagCount(newVisibleTagCount);
    }
  }, [selected, shouldRecountTags]);

  const isToday = (calendarDay, todaysDate) => {
    // console.log('calendarday ', calendarDay);
    // console.log('today ', todaysDate);
    if (
      new Date(calendarDay).toLocaleDateString() ===
      new Date(todaysDate).toLocaleDateString()
    ) {
      return true;
    }

    return false;
  };

  const handleSelection = (selection, day) => {
    console.log('selection: ', selection);
    console.log('day: ', day);
    // Update the availability type for the specific day
    setAvailabilityType((prevTypes) => ({
      ...prevTypes,
      [day.toISOString()]: {
        status: {
          value: selection.status,
          label:
            selection.status === 'AVAILABLE' ? 'AVAILABLE' : 'NOT AVAILABLE',
        },
        time: selection.time, // You can add time property here
        comment: selection.comment, // You can add comment property here
      },
    }));
  };

  const handleDayClicked = (day) => {
    const minSelectableDate = new Date(new Date().getTime() - 86400000 * 7); // 7 days ago

    if (day >= minSelectableDate) {
      // Toggle the modal state for the clicked day
      setDayModalStates((prevStates) => ({
        ...prevStates,
        [day.toISOString()]: !prevStates[day.toISOString()],
      }));
    }
  };

  useEffect(() => {
    console.log('availablity tpye: ', availabilityType);
    console.log('proposla prop data ', proposals);
  }, [availabilityType]);

  return (
    <div className="w-full px-4 xl:w-500 lg:mx-auto">
      <div className="calendar-container mt-4 flex flex-col gap-[40px]">
        <div className="flex flex-col lg:flex-row gap-[12px]">
          <button
            className={
              buttonStyles +
              ` ${
                startOfMonth(viewing) <= startOfMonth(new Date())
                  ? 'bg-slate-300'
                  : 'cursor-pointer'
              }`
            }
            onClick={viewPreviousMonth}
            disabled={startOfMonth(viewing) <= startOfMonth(new Date())}
          >
            Previous
          </button>
          <div className="flex-grow text-center order-first lg:order-none font-[500] text-[#B8AFAD] text-[26px]">
            {format(viewing, 'MMMM yyyy')}
          </div>
          <button className={buttonStyles} onClick={viewNextMonth}>
            Next
          </button>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-7 gap-[31px] mt-2">
          {calendar[0][0].map((day) => (
            <div key={day} className="hidden text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][getDay(day)]}
            </div>
          ))}
          {calendar[0].map((week) => (
            <React.Fragment key={`week-${week[0]}`}>
              {week.map((day) => (
                <div
                  key={day}
                  className={`day-box flex flex-col text-center border border-[#7DA94D] rounded p-[5px] border-[2px] hover:border-[#EEDBCE] hover:border-[3px]
                  ${
                    inRange(
                      day,
                      new Date(new Date().getTime() - 86400000),
                      endOfMonth(viewing)
                    )
                      ? 'cursor-pointer border-[#A69D9A]'
                      : 'text-gray-400 opacity-50 pointer-events-none'
                  }
                  ${
                    availabilityType[day.toISOString()] &&
                    availabilityType[day.toISOString()].status.value ===
                      'AVAILABLE'
                      ? 'bg-[#427F1C] text-[#ffffff] font-[800]'
                      : availabilityType[day.toISOString()] &&
                        availabilityType[day.toISOString()].status.value ===
                          'NOT_AVAILABLE'
                      ? 'border-[2px] bg-[#554D3D] text-[#ffffff]'
                      : availabilityType[day.toISOString()] &&
                        availabilityType[day.toISOString()].status.value ===
                          null
                      ? 'border-[2px] border-[#FCAAA3]'
                      : 'border-[2px] border-white'
                  } 
                  
                  xl:w-[100px] xl:h-[125px]`}
                  onClick={() => handleDayClicked(day)}
                >
                  <div className="day-details-info flex flex-row justify-between items-center">
                    <div className="day-name">
                      {/* day number and name */}
                      <span
                        className={
                          availabilityType[day.toISOString()] &&
                          availabilityType[day.toISOString()].status.value ===
                            'AVAILABLE'
                            ? 'text-[#ffffff] font-[500]'
                            : availabilityType[day.toISOString()] &&
                              availabilityType[day.toISOString()].status
                                .value === 'NOT_AVAILABLE'
                            ? 'bg-[#554D3D] text-[#A5825E]'
                            : availabilityType[day.toISOString()] &&
                              availabilityType[day.toISOString()].status
                                .value === null
                            ? 'border-[#FCAAA3] text-[#89945D]'
                            : 'border-white text-[#89945D]'
                        }
                      >
                        {new Date(day).getDate(0)}{' '}
                        {new Date(day)
                          .toLocaleString('en-US', { weekday: 'long' })
                          .slice(0, 3)}
                      </span>
                    </div>
                    {isToday(day, new Date()) && (
                      <div className="today flex">
                        <IoToday fill="rgb(211,203,154)" />
                      </div>
                    )}
                  </div>
                  {proposals &&
                    proposals.length &&
                    proposals.map((item, idx) => {
                      return (
                        <>
                          {new Date(item.info.date)
                            .toUTCString()
                            .slice(0, 8) ===
                            new Date(day).toUTCString().slice(0, 8) && (
                            <div
                              key={idx}
                              className="eventname text-[12px] text-[#ffffff] font-[500] mt-[12px] flex justify-evenly"
                            >
                              {/* {item.eventName} Display the proposal name */}
                              Meetup
                            </div>
                          )}
                        </>
                      );
                    })}
                  {availabilityType && availabilityType[day.toISOString()] && (
                    <div className="daily-schedule-details z-[9] py-[10px]">
                      <div className="status-detail flex justify-center">
                        <p className="details flex  items-center justify-center text-[12px] text-[#D3CB9A] font-[800] font-inter overflow-hidden whitespace-normal truncate w-[100%]">
                          {availabilityType[day.toISOString()].status.label}
                        </p>
                      </div>
                      <div className="status-detail flex justify-center">
                        {availabilityType[day.toISOString()] && (
                          <p className="details flex  items-center justify-center text-[12px] text-[#D3CB9A] font-[800] font-inter overflow-hidden whitespace-normal truncate w-[100%]">
                            {availabilityType[day.toISOString()].time}
                          </p>
                        )}
                      </div>

                      <div className="status-detail flex justify-center">
                        <p className="details flex  items-center justify-center text-[12px] text-[#ffffff] font-[400] font-inter overflow-hidden whitespace-normal truncate w-[100%]">
                          {availabilityType[day.toISOString()].status.value ===
                          'NOT_AVAILABLE' ? (
                            <NoSymbolIcon
                              height="24"
                              width="24"
                              fill="#CE2938"
                            />
                          ) : (
                            <CheckIcon height="24" width="24" fill="#9BC96B" />
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className={`day-box flex flex-col gap-[12px]`}>
                    <div className="calendar-day-sq flex flex-row justify-between">
                      <div className="box-info">
                        <ScheduleForm
                          selected={(selection) =>
                            handleSelection(selection, day)
                          }
                          dayInfo={day}
                          isOpen={dayModalStates[day.toISOString()]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Today button */}
      <div className="mt-4">
        <button className={buttonStyles} onClick={viewToday}>
          Today
        </button>
      </div>
    </div>
  );
};
