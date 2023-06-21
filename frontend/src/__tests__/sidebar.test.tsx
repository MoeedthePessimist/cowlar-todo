/* eslint-disable react/react-in-jsx-scope */

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SideBar, { Filter } from '../components/side-bar/side-bar';

describe('SideBar', () => {
  it('renders the sidebar component with filter buttons and title letters', () => {
    const onPressFilter = jest.fn();
    const { getByText } = render(<SideBar onPressFilter={onPressFilter} />);

    // Verify filter buttons
    const personalFilterButton = getByText('personal');
    const urgentFilterButton = getByText('urgent');
    const workFilterButton = getByText('work');
    expect(personalFilterButton).toBeInTheDocument();
    expect(urgentFilterButton).toBeInTheDocument();
    expect(workFilterButton).toBeInTheDocument();
  });

  it('calls onPressFilter when a filter button is clicked', () => {
    const onPressFilter = jest.fn();
    const { getByText } = render(<Filter onPressFilter={onPressFilter} filter="personal" />);
    const filterButton = getByText('Personal');
    fireEvent.click(filterButton);
    expect(onPressFilter).toHaveBeenCalledWith('personal');
  });
});
