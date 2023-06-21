/* eslint-disable react/react-in-jsx-scope */

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Loader from '../components/loader/loader';

describe('Loader', () => {
  it('renders the loader component with the provided message', () => {
    const message = 'Loading...';
    const { getByText } = render(<Loader message={message} />);
    const loadingMessage = getByText(message);
    expect(loadingMessage).toBeInTheDocument();
  });
});
