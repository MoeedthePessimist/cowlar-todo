/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import InputBar from '../components/input-bar/input-bar';

const mockProps = {
  task: '',
  setTask: jest.fn(),
  onPressAdd: jest.fn(),
  onPressFilter: jest.fn(),
  addedFilters: [],
  onPressEnter: jest.fn(),
};

describe('InputBar component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    render(<InputBar {...mockProps} />);
  });

  it('updates task value on input change', () => {
    const newTask = 'New task';
    render(<InputBar {...mockProps} />);
    const inputElement = screen.getByPlaceholderText('What is your next task');
    fireEvent.change(inputElement, { target: { value: newTask } });
    expect(mockProps.setTask).toHaveBeenCalledWith(newTask);
  });

  it('calls onPressAdd when add button is clicked', () => {
    render(<InputBar {...mockProps} />);
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);
    expect(mockProps.onPressAdd).toHaveBeenCalled();
  });

  it('calls onPressEnter when Enter key is pressed', () => {
    render(<InputBar {...mockProps} />);
    const inputElement = screen.getByTestId('input');
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockProps.onPressEnter).toHaveBeenCalled();
  });
});
