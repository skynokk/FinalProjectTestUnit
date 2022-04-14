import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import useCart from "../../hooks/useCart";
import { Product } from "../../App";

const server = setupServer(
    rest.get(
        "http://localhost:8000/api/cart",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    products: [{
                        id: 1,
                        name: 'Rick Sanchez',
                        price: 20,
                        quantity: 20,
                        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
                    },
                    {
                        id: 15,
                        name: 'Alien Rick',
                        price: 20,
                        quantity: 20,
                        image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                    },
                    {
                        id: 3,
                        name: "Summer Smith",
                        price: 67.6,
                        quantity: 20,
                        image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
                    }]
                }))
        }),
    rest.delete(
        "http://localhost:8000/api/cart/15",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    products: {
                        "1": {
                            id: 1,
                            name: 'Rick Sanchez',
                            price: '20',
                            quantity: 20,
                            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
                        },
                        "2": {
                            id: 17,
                            name: 'Annie',
                            price: '20',
                            quantity: 20,
                            image: 'https://rickandmortyapi.com/api/character/avatar/17.jpeg'
                        }
                    }
                }))
        })

);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("load cart", async () => {
    const { result } = renderHook(() => useCart());
    const { loading, loadCart } = result.current;
    expect(loading).toEqual(true);
    await act(async () => {
        await loadCart()
    });
    const { products } = result.current;
})

test("remove to cart", async () => {
    const deleteCart: Product = {
        id: 15,
        name: 'Alien Rick',
        price: '20',
        quantity: 20,
        image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
    }
    const { result } = renderHook(() => useCart());
    const { loading, removeToCart } = result.current;
    expect(loading).toEqual(true);
    await act(async () => {
        await removeToCart(deleteCart);
    });
    const { message } = result.current;
});