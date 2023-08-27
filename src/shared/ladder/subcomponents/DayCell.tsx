import React from 'react';
import { ScheduleForm } from './ScheduleForm';
import { TrophyIcon } from '@heroicons/react/20/solid';
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoCloudyNight,
} from 'react-icons/io5';

export const DayCell = ({
  day,
  availabilityType,
  handleDayClicked,
  dayModalStates,
  handleSelection,
  data,
  isAfterProp,
  inRangeProp,
  isTodayProp,
  isSameMonthProp,
  endOfMonthProp,
  viewingProp,
  subDaysProp,
}) => {
  // Determine the cell's classes based on various conditions
  function calculateCellClasses(
    day,
    isAfterProp,
    isSameMonthProp,
    inRangeProp,
    endOfMonthProp,
    viewingProp,
    isTodayProp
  ) {
    let cellClasses =
      'day-box min-h-[120px] flex flex-col justify-between rounded p-[5px] border-[2px] hover:border-[#EEDBCE] hover:border-[3px]';

    if (
      !isAfterProp(day, subDaysProp(new Date(), 1)) ||
      !isSameMonthProp(day, viewingProp)
    ) {
      cellClasses += ' opacity-[0.2] pointer-events-none';
    }

    if (
      !inRangeProp(
        day,
        new Date(new Date().getTime() - 86400000),
        endOfMonthProp(viewingProp)
      )
    ) {
      cellClasses +=
        ' text-gray-400 pointer-events-none border border-[#625e5e38]';
    } else {
      cellClasses += ' cursor-pointer border-[#A69D9A]';
    }

    if (isTodayProp(day, new Date())) {
      cellClasses += ' border-yellow-300 bg-[#222c0080]';
    }

    return cellClasses;
  }

  const cellClasses = calculateCellClasses(
    day,
    isAfterProp,
    isSameMonthProp,
    inRangeProp,
    endOfMonthProp,
    viewingProp,
    isTodayProp
  );

  const hasProposalsForDay = data.some(
    (item) =>
      new Date(item.info.date).toUTCString().slice(0, 8) ===
      new Date(day).toUTCString().slice(0, 8)
  );

  const styles = {
    // ... your existing styles
    neonGreenBorder: 'border-[#6AE5F0]', // Neon green border color
  };

  const getAvailability = (thisDay) => {
    console.log('av thisDay ', new Date(thisDay).toISOString());
    console.log('av type ', availabilityType);
    console.log(
      'this one ',
      availabilityType[`${new Date(thisDay).toISOString()}`]
    );
    if (
      availabilityType &&
      availabilityType[`${new Date(thisDay).toISOString()}`] &&
      availabilityType[`${new Date(thisDay).toISOString()}`]['status']
    ) {
      console.log(
        'testing hre ',
        availabilityType[`${new Date(thisDay).toISOString()}`]['status']
      );
      return availabilityType[`${new Date(thisDay).toISOString()}`]['status']
        .value;
    }
  };

  return (
    <div
      key={day}
      className={`${cellClasses} ${
        hasProposalsForDay ? styles.neonGreenBorder : ''
      }`}
      onClick={() => handleDayClicked(day)}
    >
      <div className="day-details-info flex flex-col justify-start">
        <div className="day-name flex gap-[12px]">
          {/* day number and name */}
          <span
            className={`hello flex flex-row ${
              getAvailability(day) === 'AVAILABLE'
                ? ' text-[green] font-[500]'
                : 'text-[#ffffff]'
            }`}
          >
            {new Date(day).getDate(0)}{' '}
            {new Date(day)
              .toLocaleString('en-US', { weekday: 'long' })
              .slice(0, 3)}
          </span>
          <span className="flex gap-[12px] pt-[5px]">
            {getAvailability(day) === 'AVAILABLE' && (
              <IoCheckmarkCircle fill="green" />
            )}
            {getAvailability(day) === 'NOT_AVAILABLE' && (
              <IoCloseCircle fill="red" />
            )}
          </span>
        </div>
      </div>

      {data &&
        data.length > 0 &&
        data
          .filter(
            (item) =>
              new Date(item.info.date).toUTCString().slice(0, 8) ===
              new Date(day).toUTCString().slice(0, 8)
          )
          .map((item, idx) => (
            <div
              key={idx}
              className="eventname text-[16px] text-[#6AE5F0] font-[500] mt-[12px] flex flex-col items-center gap-[12px]"
            >
              {/* {item.eventName} Display the proposal name */}
              <span>
                <TrophyIcon height="24" width="24" fill="#F6F5F7" />
              </span>
              <span>Meetup</span>
            </div>
          ))}

      <div className={`day-box flex flex-col gap-[12px]`}>
        <div className="calendar-day-sq flex flex-row justify-between">
          <div className="box-info">
            <ScheduleForm
              selected={(selection) => handleSelection(selection, day)}
              dayInfo={day}
              isOpen={dayModalStates[day.toISOString()]}
              onClose={() =>
                setDayModalStates((prevState) => ({
                  ...prevState,
                  [day.toISOString()]: false, // Close the modal for the selected day
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
