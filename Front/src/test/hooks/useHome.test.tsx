import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderHook, act } from "@testing-library/react-hooks";
import useHome from "../../hooks/useHome";

const server = setupServer(
    rest.get(
        "http://localhost:8000/api/products",
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

test("load product", async () => {
    const { result } = renderHook(() => useHome());
    const { loading, loadProducts } = result.current;
    expect(loading).toEqual(true);
    await act(async () => {
        await loadProducts()
    }
    );
    const { products } = result.current;
    expect(products).toEqual({"products": [{"id": 1, "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg", "name": "Rick Sanchez", "price": 20, "quantity": 20}, {"id": 15, "image": "https://rickandmortyapi.com/api/character/avatar/15.jpeg", "name": "Alien Rick", "price": 20, "quantity": 20}, {"id": 3, "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg", "name": "Summer Smith", "price": 67.6, "quantity": 20}]})
});