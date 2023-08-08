import { toHaveStyle } from '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ScheduleForm } from '../subcomponents/ScheduleForm';

import ResizeObserver from 'resize-observer-polyfill';
import { act } from 'react-dom/test-utils';
global.ResizeObserver = ResizeObserver;

jest.mock('use-resize-observer', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

describe('ScheduleForm', () => {
  it('handles availability selection', () => {
    render(<ScheduleForm isOpen={true} />);

    const availableButton = screen.getByText('Available');
    fireEvent.click(availableButton);

    // Check if the button has the expected Tailwind CSS class
    expect(availableButton).toHaveClass('bg-[#3DCB6C]'); // Change to your actual class name
  });

  it('handles not available selection', () => {
    render(<ScheduleForm isOpen={true} />);

    const notAvailableBtn = screen.getByText('Not Available');
    fireEvent.click(notAvailableBtn);

    // Check if the button has the expected Tailwind CSS class
    expect(notAvailableBtn).toHaveClass('bg-[#E55552]'); // Change to your actual class name
  });

  it('handles none selection of buttons', () => {
    render(<ScheduleForm isOpen={true} />);

    const notAvailableBtn = screen.getByText('Not Available');
    const availableBtn = screen.getByText('Available');

    // Check if the button classes contain the expected parts of the dynamic class
    expect(notAvailableBtn).toHaveClass('bg-[#E55552]');
    expect(availableBtn).toHaveClass('bg-slate-300');
  });

  it('handles the functionality that shows the timepicker when user clicks available', () => {
    render(<ScheduleForm isOpen={true} />);
    // Check that the time picker is initially not present
    expect(screen.queryByText('Set a time:')).toBeNull();

    // Get the "Available" button and click it
    const availableButton = screen.getByText('Available');
    fireEvent.click(availableButton);

    // Check that the time picker is now visible
    expect(screen.getByText('Set a time:')).toBeInTheDocument();

    // You can also check the visibility of other elements related to the time picker
    expect(screen.getByLabelText('Hours')).toBeInTheDocument();
    expect(screen.getByLabelText('Minutes')).toBeInTheDocument();
    expect(screen.getByLabelText('AM')).toBeInTheDocument();
    expect(screen.getByText('Save Time')).toBeInTheDocument();
  });
});
