import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Products from "../index";
import { setupServer } from "msw/node";
import {
  rest,
  type RestRequest,
  type RestContext,
  type ResponseComposition,
} from "msw";
import { store } from "../../../app/store";

const server = setupServer(
  rest.get(
    "http://localhost:4000/products",
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) =>
      res(
        ctx.json([
          {
            id: 1,
            name: "Product A",
            price: 100,
            old_price: 120,
            rating: 4,
            reviews: 10,
            discount: "20%",
          },
        ])
      )
  ),

  rest.post(
    "http://localhost:4000/products",
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      return res(ctx.json({ id: 2, ...req.body }));
    }
  ),

  rest.put(
    "http://localhost:4000/products/:id",
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      return res(ctx.json({ id: Number(req.params.id), ...req.body }));
    }
  ),

  rest.delete(
    "http://localhost:4000/products/:id",
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) =>
      res(ctx.status(200))
  )
);

// Start and stop server
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Helper to render with Redux provider
const renderWithProvider = (ui: React.ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

describe("Products Page Integration Tests", () => {
  test("renders product list from API", async () => {
    renderWithProvider(<Products />);

    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
    expect(await screen.findByText("Product A")).toBeInTheDocument();
  });

  test("adds a new product", async () => {
    renderWithProvider(<Products />);

    fireEvent.click(screen.getByText(/add product/i)); // open add modal

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Product B" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: 200 },
    });

    fireEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByText("Product B")).toBeInTheDocument();
  });

  test("edits a product", async () => {
    renderWithProvider(<Products />);

    // open edit modal for Product A
    fireEvent.click(await screen.findByTestId("product-card-1-edit"));

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Product A Updated" },
    });

    fireEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByText("Product A Updated")).toBeInTheDocument();
  });

  test("deletes a product", async () => {
    renderWithProvider(<Products />);

    // open delete modal
    fireEvent.click(await screen.findByTestId("product-card-1-delete"));
    fireEvent.click(screen.getByText(/delete/i)); // confirm delete

    await waitFor(() => {
      expect(screen.queryByText("Product A")).not.toBeInTheDocument();
    });
  });

  test("validates input fields", async () => {
    renderWithProvider(<Products />);

    fireEvent.click(screen.getByText(/add product/i));
    fireEvent.click(screen.getByText(/submit/i));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/price must be a valid number/i)
    ).toBeInTheDocument();
  });

  test("shows no products available message", async () => {
    server.use(
      rest.get(
        "http://localhost:4000/products",
        (_: RestRequest, res: ResponseComposition, ctx: RestContext) =>
          res(ctx.json([]))
      )
    );

    renderWithProvider(<Products />);

    expect(
      await screen.findByText(/no products available/i)
    ).toBeInTheDocument();
  });
});
