/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Error from '../components/error/error';

describe('Error component', () => {
  it('renders the error message correctly', () => {
    const errorMessage = 'Something went wrong';
    render(<Error message={errorMessage} />);

    const errorElement = screen.getByText(`${errorMessage} :<`);
    expect(errorElement).toBeInTheDocument();
  });

  it('renders the error illustration', () => {
    const errorMessage = 'Something went wrong';
    render(<Error message={errorMessage} />);

    const errorIllustration = screen.getByAltText('Error Illustration');
    expect(errorIllustration).toBeInTheDocument();
  });
});
