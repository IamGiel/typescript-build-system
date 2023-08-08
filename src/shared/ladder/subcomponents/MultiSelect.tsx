import { endOfMonth, format, getDay, isToday, startOfMonth } from 'date-fns';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  IoCalendarClearSharp,
  IoChevronBackSharp,
  IoChevronForwardSharp,
  IoCheckmarkSharp,
} from 'react-icons/io5';

import { useLilius } from 'use-lilius';
import { Dropdown, ScheduleForm } from './ScheduleForm';

export const MultiSelect: React.FC = () => {
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
  const [availabilityType, setAvailabilityType] = useState({});
  const [previouslySelected, setPreviouslySelected] = useState([]);
  const [visibleTagCount, setVisibleTagCount] = useState(0);
  const shouldRecountTags =
    previouslySelected?.length || selected.length > visibleTagCount;

  const buttonStyles = 'text-white px-2 py-1 rounded bg-[#5EB5D4]';

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
    // Update the availability type for the specific day
    setAvailabilityType((prevTypes) => ({
      ...prevTypes,
      [day.toISOString()]: {
        status: {
          value: selection.status.value,
          label: selection.status.label,
        },
        time: selection.time, // You can add time property here
        comment: selection.comment, // You can add comment property here
      },
    }));
  };

  const handleDayClicked = (day) => {
    // Toggle the modal state for the clicked day
    setDayModalStates((prevStates) => ({
      ...prevStates,
      [day.toISOString()]: !prevStates[day.toISOString()],
    }));
  };

  return (
    <div className="w-500">
      {/* ... Selected tags */}
      {/* <div className="flex space-x-2">
        {selected.map((date, index) => {
          if (index < visibleTagCount) {
            return (
              <div
                key={`${date}`}
                className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center"
              >
                <span className="mr-1">{format(date, 'MM/dd/yyyy')}</span>
                <button className="text-white" onClick={() => toggle(date)}>
                  &times;
                </button>
              </div>
            );
          }
          return null;
        })}
        {visibleTagCount < selected.length && (
          <div className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">+{selected.length - visibleTagCount}</span>
          </div>
        )}
      </div> */}

      {/* Calendar */}
      <div className="calendar-container mt-4 flex flex-col gap-[40px]">
        <div className="flex">
          <button className={buttonStyles} onClick={viewPreviousMonth}>
            Previous
          </button>
          <div className="flex-grow text-center">
            {format(viewing, 'MMMM yyyy')}
          </div>
          <button className={buttonStyles} onClick={viewNextMonth}>
            Next
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2">
          {calendar[0][0].map((day) => (
            <div key={day} className="text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][getDay(day)]}
            </div>
          ))}
          {calendar[0].map((week) => (
            <React.Fragment key={`week-${week[0]}`}>
              {week.map((day) => (
                <div
                  key={day}
                  className={`day-box flex flex-col text-center border border-[#ffffff] rounded h-[100px] w-[100px] p-[5px] ${
                    inRange(day, new Date(), endOfMonth(viewing))
                      ? 'cursor-pointer'
                      : 'text-gray-400 opacity-50 pointer-events-none'
                  } 
                  ${
                    isToday(day, new Date())
                      ? 'bg-black rounded border border-slate 300'
                      : ''
                  }
                  ${
                    availabilityType[day.toISOString()] &&
                    availabilityType[day.toISOString()].status.value ===
                      'FLEXIBLE'
                      ? 'bg-[#3DCB6C]'
                      : availabilityType[day.toISOString()] &&
                        availabilityType[day.toISOString()].status.value ===
                          'LIMITED'
                      ? 'bg-[#CBF8AC]'
                      : availabilityType[day.toISOString()] &&
                        availabilityType[day.toISOString()].status.value ===
                          'NOT'
                      ? 'bg-[#FCAAA3]'
                      : 'bg-white'
                  }
                  `}
                  onClick={() => handleDayClicked(day)}
                >
                  <span>{new Date(day).getDate(0)}</span>
                  <div className={`day-box flex flex-col gap-[12px]`}>
                    <div className="calendar-day-sq flex flex-row justify-between">
                      <div className="box-info">
                        {/* lets add a dropdown selection for availability type: limited or flexible, if limited offer a time selection */}
                        <ScheduleForm
                          selected={(selection) =>
                            handleSelection(selection, day)
                          }
                          dayInfo={day}
                          isOpen={dayModalStates[day.toISOString()]}
                        />
                        {/* <pre>{JSON.stringify(day)}</pre> */}
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
