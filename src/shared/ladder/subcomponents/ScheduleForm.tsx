import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export const ScheduleForm = ({ isOpen, dayInfo, selected }) => {
  const [open, setOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState('NOT_AVAILABLE');
  const [selectedTime, setSelectedTime] = useState(null);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [ampm, setAMPM] = useState('am');

  useEffect(() => {
    setOpen(isOpen ? isOpen : false);
  }, [isOpen]);

  const handleAvailabilitySelection = (status) => {
    console.log('status: ', status);
    setIsAvailable(status);
  };
  const handleTimeSelection = () => {
    console.log(minutes);
    const leadingZeroes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${hours}:${leadingZeroes} ${ampm}`;
    console.log('formatted time: ', formattedTime);
    setSelectedTime(formattedTime);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CalendarDaysIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Set your availability for{' '}
                      {new Date(dayInfo).toDateString()}
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="selection-buttons relative">
                        {/* Availability Buttons */}
                        <div className="mt-2 flex gap-2 flex flex-row justify-center">
                          <button
                            className={`px-3 py-1 rounded text-white ${
                              isAvailable === 'AVAILABLE'
                                ? 'bg-[#3DCB6C]'
                                : 'bg-slate-300'
                            }`}
                            onClick={() =>
                              handleAvailabilitySelection('AVAILABLE')
                            }
                          >
                            Available
                          </button>
                          <button
                            className={`px-3 py-1 rounded text-white ${
                              isAvailable === 'NOT_AVAILABLE'
                                ? 'bg-[#E55552]'
                                : 'bg-slate-300'
                            }`}
                            onClick={() =>
                              handleAvailabilitySelection('NOT_AVAILABLE')
                            }
                          >
                            Not Available
                          </button>
                        </div>
                      </div>
                      {/* lets show this section if user is available */}
                      {isAvailable === 'AVAILABLE' && (
                        <div className="time-selector flex flex-col items-center m-[12px]">
                          <div className="label-set-time">
                            <p>Set a time:</p>
                          </div>
                          <div className="m-[5px] p-[12px] w-40 bg-white rounded-lg shadow-xl">
                            <div className="flex justify-between">
                              <label
                                htmlFor="hours"
                                className="labeltime hidden"
                              >
                                Hours
                              </label>
                              <select
                                id="hours"
                                name="hours"
                                className="bg-transparent text-xl appearance-none outline-none"
                                onChange={(e) => setHours(e.target.value)}
                                value={hours || 12}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                              </select>
                              <span className="text-xl mr-3">:</span>
                              <label
                                htmlFor="minutes"
                                className="labeltime hidden"
                              >
                                Minutes
                              </label>
                              <select
                                id="minutes"
                                name="minutes"
                                className="bg-transparent text-xl appearance-none outline-none mr-4"
                                onChange={(e) => setMinutes(e.target.value)}
                                value={minutes || 0}
                              >
                                <option value="0">00</option>
                                <option value="30">30</option>
                              </select>
                              <label
                                htmlFor="ampm"
                                className="labeltime hidden"
                              >
                                AM
                              </label>
                              <select
                                id="ampm"
                                name="ampm"
                                className="bg-transparent text-xl appearance-none outline-none"
                                onChange={(e) => setAMPM(e.target.value)}
                                value={ampm}
                              >
                                <option value="am">AM</option>
                                <option value="pm">PM</option>
                              </select>
                            </div>
                            <button
                              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
                              onClick={() => handleTimeSelection()}
                            >
                              Save Time
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Go back to dashboard
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
