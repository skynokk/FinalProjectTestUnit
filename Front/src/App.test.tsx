import { render, screen } from '@testing-library/react';
import App from './App';

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test('renders cart link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Aller sur panier/i);
  expect(linkElement).toBeInTheDocument();
});