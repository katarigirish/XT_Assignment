import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders react', () => {
  const { getByText } = render(<App />);
  const tableElement = getByText(/comments/i);
  expect(tableElement).toBeInTheDocument();
});
