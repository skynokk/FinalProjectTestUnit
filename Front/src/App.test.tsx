import { render, screen } from '@testing-library/react';
import App from './App';
import Cart from './components/Cart';
import Product from './components/Product';

let container: any;
let product = {
  id: 1,
  name: "string",
  price: 12,
  quantity: 20,
  image: "string"
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test('renders cart link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Aller sur panier/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders return link', () => {
  render(<Cart setRoute={function (cart): void { }} />);
  const linkElement = screen.getByText(/Retour/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders product link', () => {
  render(<Product setRoute={function (): void { }} data={product} />);
  const linkElement = screen.getByText(/Ajouter au panier/i);
  expect(linkElement).toBeInTheDocument();
});