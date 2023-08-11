import React from 'react';

export const InputComponent = ({
  type,
  value,
  css,
  placeholder,
  handleChange,
  handleEnterKeyPress,
  loadingStatus,
}) => {
  return (
    <div>
      {/* <label htmlFor="email" className="sr-only">
        {label}
      </label> */}
      <input
        type={type}
        name={type}
        id={type}
        className={`${css} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        placeholder={placeholder || 'Enter a placeholder'}
        onChange={(e) => handleChange(e)}
        onKeyPress={handleEnterKeyPress}
        disabled={loadingStatus}
        value={value}
      />
    </div>
  );
};
