import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tabs', () => {
  render(<App />);
  const pElement = screen.getByText(/Accelerator/i);
  expect(pElement).toBeInTheDocument();
});
