import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook, act } from "@testing-library/react-hooks";
import useProduct from "../../hooks/useProduct";
import { Product } from "../../App";


const server = setupServer(
    rest.post(
        "http://localhost:8000/api/cart/1",
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
        }));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('add products', async () => {
    const addProducts: Product = {
        id: 1,
        name: 'Rick Sanchez',
        price: '45.6',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        quantity: 20,
    }
    const { result } = renderHook(() => useProduct(addProducts));
    const { loading, addProduct } = result.current;
    expect(loading).toEqual(false);
    await act(async () => {
        await addProduct();
    });
    const { message } = result.current;
});