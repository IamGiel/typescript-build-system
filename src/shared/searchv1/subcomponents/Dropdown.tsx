import React, { Fragment, useEffect, useRef, useState } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Dropdown = ({ labelProp, dataProp, onCheckedItemsChange }) => {
  const menuRef = useRef(null);
  const [checkedItems, setCheckedItems] = useState([]);
  // useEffect(() => {
  //   console.log('labelProp: ', labelProp);
  //   console.log('dataprop: ', dataProp);
  // }, []);
  const handleMenuItemClick = (key) => {
    setCheckedItems((prev) => {
      const index = prev.findIndex((item) => item.key === key);
      if (index !== -1) {
        // If the item is already checked, remove it from the array
        return [...prev.slice(0, index), ...prev.slice(index + 1)];
      } else {
        // If the item is not checked, add it to the array
        return [...prev, { key, checked: true }];
      }
    });
  };

  useEffect(() => {
    // Call the onCheckedItemsChange prop whenever checkedItems changes
    onCheckedItemsChange(checkedItems);
  }, [checkedItems, onCheckedItemsChange]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <pre>{JSON.stringify(checkedItems, null, 4)}</pre>
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {labelProp}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
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
        <Menu.Items
          ref={menuRef}
          className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-[max-content] max-h-[350px] overflow-scroll"
        >
          <div className="py-1 grid grid-cols-2 gap-4">
            {dataProp.map((item) => (
              <Menu.Item key={item.key}>
                {({ active }) => (
                  <label
                    className={classNames(
                      'block px-4 py-2 text-sm border border-slate-200 min-h-[100px]',
                      {
                        'bg-gray-100': active || checkedItems[item.key],
                      }
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems[item.key]}
                      className="mr-2"
                      onChange={() => handleMenuItemClick(item.key)}
                    />
                    {item.key} {item.label}
                  </label>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
