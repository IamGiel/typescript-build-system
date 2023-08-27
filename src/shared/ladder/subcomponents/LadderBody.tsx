import React, { useState } from 'react';
import { MultiSelectCalendar } from './MultiSelectCalendar';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface Player {
  playerName: string;
  playerId: string;
  events: {
    eventName: string;
    date: Date;
  }[];
}

interface IProposal {
  id: string;
  eventName: string;
  author: Player & { isPlaying: boolean };
  info: {
    date: number; // UTC date in milliseconds
    time: number; // Time in milliseconds
    requiredPlayers: number;
    subscribedPlayers: Player[];
  };
}

export const LadderBody = () => {
  const proposals: IProposal[] = [
    {
      id: 'some_proposal_id',
      eventName: 'Wednesdays Tennis aaaas sdsdsd sdd',
      author: { playerName: 'Ivan', playerId: 'playerid', isPlaying: true },
      info: {
        date: new Date('2023-08-24T21:00:00').toUTCString(), // Date in milliseconds since Unix epoch
        time: new Date('2023-08-24T21:00:00').toUTCString(), // Time in milliseconds since Unix epoch
        requiredPlayers: 8,
        subscribedPlayers: [
          { playerName: 'Gel', playerId: 'playerid' },
          { playerName: 'Max', playerId: 'playerid' },
          { playerName: 'Sam', playerId: 'playerid' },
        ],
      },
    },
    {
      id: 'some_proposal_id',
      eventName: 'Mens 3.5 Doubles Meetup somethign',
      author: { playerName: 'Ivan', playerId: 'playerid', isPlaying: true },
      info: {
        date: new Date('2023-08-21T21:00:00').toUTCString(), // Date in milliseconds since Unix epoch
        time: new Date('2023-08-21T21:00:00').toUTCString(), // Time in milliseconds since Unix epoch
        requiredPlayers: 8,
        subscribedPlayers: [
          { playerName: 'Gel', playerId: 'playerid' },
          { playerName: 'Max', playerId: 'playerid' },
          { playerName: 'Sam', playerId: 'playerid' },
        ],
      },
    },
    {
      id: 'some_proposal_id',
      eventName: 'Wednesdays Tennis aaaas sdsdsd sdd',
      author: { playerName: 'Ivan', playerId: 'playerid', isPlaying: true },
      info: {
        date: new Date('2023-08-28T21:00:00').toUTCString(), // Date in milliseconds since Unix epoch
        time: new Date('2023-08-28T21:00:00').toUTCString(), // Time in milliseconds since Unix epoch
        requiredPlayers: 8,
        subscribedPlayers: [
          { playerName: 'Gel', playerId: 'playerid' },
          { playerName: 'Max', playerId: 'playerid' },
          { playerName: 'Sam', playerId: 'playerid' },
        ],
      },
    },
  ];

  const [showProposal, setShowProposal] = useState(false);
  const handleShowProposal = () => {
    setShowProposal(!showProposal);
  };

  return (
    <div className="ladder-body-container flex flex-col lg:flex-row my-[12px] p-[24px] gap-[24px]">
      <div className="lb-section flex flex-col gap-[12px] rounded border border-slate-300 p-[12px] min-w-[240px]">
        <div className="list-of-matches-section flex flex-col gap-[12px]">
          <div className="ts-header-title  p-[12px] rounded bg-[#142A24] max-w-[200px]">
            <div
              className="proposal-sec-header relative flex items-center justify-between font-[600] text-[16px] text-[#6AE5F0]  cursor-pointer"
              onClick={handleShowProposal}
            >
              <span>Proposed Events </span>
              <span className="alert-numcircle">
                <div className="absolute top-0 right-0 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {proposals.length}
                  </span>
                </div>
              </span>
              {showProposal && (
                <ChevronDownIcon height="24" width="24" fill="#B8AFAD" />
              )}
              {!showProposal && (
                <ChevronRightIcon height="24" width="24" fill="#B8AFAD" />
              )}
            </div>
            {showProposal && (
              <div className="proposal-list-section flex flex-col justify-start gap-[12px] my-[12px]">
                {proposals &&
                  proposals.length &&
                  proposals.map((proposal, idx) => (
                    <div
                      className="flex flex-row items-center justify-between gap-[12px] p-[12px] border bg-[#5f9ea0]"
                      key={idx}
                    >
                      <span className="proposal-title text-[16px] text-[#DFEFF7] font-[500]">
                        {proposal.eventName}
                      </span>{' '}
                      {/* <span className="flex items-center w-[7px] h-[7px] bg-red-500 rounded-full m-[8px]"></span> */}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div>Available players today</div>
      </div>
      <div className="lb-section flex flex-grow flex-col rounded border border-slate-300 p-[12px]">
        <div className="ts-header-title font-[600] text-[24px] text-[#B8AFAD] p-[12px]">
          <span>Your Availability</span>
        </div>
        <div className="list-container flex flex-col gap-[12px]">
          <div className="lsitem-name">
            <MultiSelectCalendar proposals={proposals} />
          </div>
        </div>
      </div>
    </div>
  );
};
