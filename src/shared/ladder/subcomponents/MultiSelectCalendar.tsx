import {
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
  addDays,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameWeek,
  isAfter,
  isSameMonth,
  subDays,
} from 'date-fns';
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
import { CheckIcon, NoSymbolIcon, TrophyIcon } from '@heroicons/react/20/solid';
import { DayCell } from './DayCell';

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
    weekStartsOn,
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

  const startOfCurrentWeek = startOfWeek(viewing, { weekStartsOn });

  useEffect(() => {
    selected ?? setPreviouslySelected(selected);
  }, [selected]);

  // useLayoutEffect(() => {
  //   if (shouldRecountTags) {
  //     const COUNT_TAG_WIDTH = 50;

  //     let newVisibleTagCount = selected.length;

  //     if (listRef.current) {
  //       const tags = listRef.current.querySelectorAll('[data-tag]');
  //       const containerBounds = listRef.current.getBoundingClientRect();

  //       for (let i = 0; i < tags.length; i += 1) {
  //         const tag = tags[i];
  //         const tagBounds = tag.getBoundingClientRect();

  //         if (tagBounds.right > containerBounds.right) {
  //           const previousTag = tags[i - 1];
  //           const previousTagBounds = previousTag.getBoundingClientRect();

  //           if (
  //             previousTagBounds.right >
  //             containerBounds.right - COUNT_TAG_WIDTH
  //           ) {
  //             newVisibleTagCount = i - 1;
  //           } else {
  //             newVisibleTagCount = i;
  //           }

  //           break;
  //         }
  //       }
  //     }

  //     setVisibleTagCount(newVisibleTagCount);
  //   }
  // }, [selected, shouldRecountTags]);

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

  const getSelection = (selection, day) => {
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
    setIsOpen(false);
    return availabilityType;
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
                <DayCell
                  key={day}
                  day={day}
                  availabilityType={availabilityType}
                  handleDayClicked={handleDayClicked}
                  dayModalStates={dayModalStates}
                  handleSelection={getSelection}
                  data={proposals}
                  endOfMonthProp={endOfMonth}
                  viewingProp={viewing}
                  isAfterProp={isAfter}
                  inRangeProp={inRange}
                  isTodayProp={isToday}
                  isSameMonthProp={isSameMonth}
                  subDaysProp={subDays}
                  isOpen={isOpen}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Today button */}

      <div className="my-[40px] flex justify-center">
        {!isToday(viewing, new Date()) && (
          <button className={buttonStyles} onClick={viewToday}>
            View current month
          </button>
        )}
      </div>
    </div>
  );
};
