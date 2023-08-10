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

export const MultiSelectCalendar: React.FC = () => {
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
          <div className="flex-grow text-center order-first lg:order-none">
            {format(viewing, 'MMMM yyyy')}
          </div>
          <button className={buttonStyles} onClick={viewNextMonth}>
            Next
          </button>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-7 gap-[12px] mt-2">
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
                  className={`day-box flex flex-col text-center border border-[#ffffff] rounded p-[5px] border-[2px] hover:border-[#F8CA1D] hover:border-[3px]
                  ${
                    inRange(
                      day,
                      new Date(new Date().getTime() - 86400000),
                      endOfMonth(viewing)
                    )
                      ? 'cursor-pointer'
                      : 'text-gray-400 opacity-50 pointer-events-none'
                  }
                  ${
                    isToday(day, new Date())
                      ? 'bg-green rounded border border-[#5EB5D4]'
                      : ''
                  }
                  ${
                    availabilityType[day.toISOString()] &&
                    availabilityType[day.toISOString()].status.value ===
                      'AVAILABLE'
                      ? 'bg-[#3DCB6C] text-[#ffffff]'
                      : availabilityType[day.toISOString()] &&
                        availabilityType[day.toISOString()].status.value ===
                          'NOT_AVAILABLE'
                      ? 'border-[2px] bg-[#FBBDBE] text-[#EE444D]'
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
                      <span
                        className={
                          !availabilityType[day.toISOString()]
                            ? 'text-[#5EB5D4]'
                            : 'text-[#ffffff]'
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
                        <IoToday fill="green" />
                      </div>
                    )}
                  </div>
                  {availabilityType && availabilityType[day.toISOString()] && (
                    <div className="daily-schedule-details z-[9] py-[10px]">
                      <div className="status-detail flex justify-center">
                        <p className="details flex text-[12px] font-[500] font-inter">
                          {availabilityType[day.toISOString()].status.label}
                        </p>
                      </div>
                      <div className="status-detail flex justify-center">
                        {availabilityType[day.toISOString()].status.value ===
                          'AVAILABLE' && (
                          <p className="details flex text-[12px] font-[500] font-inter">
                            {availabilityType[day.toISOString()].time}
                          </p>
                        )}
                      </div>

                      <div className="status-detail flex justify-center">
                        <p className="details flex text-[12px] font-[500] font-inter max-h-[36px] overflow-hidden overflow-y-auto">
                          {availabilityType[day.toISOString()].comment}
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
