// Test file for whole application

import { screen, render, fireEvent, waitFor, getByRole } from "@testing-library/react";
import App from "./App";
import { Http2ServerRequest, Http2ServerResponse } from "http2";

/* Tests 
    - App renders both form and display
    - On form submit, check the todo is added to list

*/

describe("App components render", () => {
  it("form renders", () => {
    render(<App />);

    expect(screen.getByTestId("form")).toBeInTheDocument();
  });

  it("list renders", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", {name: /Add to List/i}))

    // await waitFor(() => {
    //  expect(screen.getByRole("button", {name: /Edit/i})).toBeInTheDocument();
    // })  
  });
});

describe("Mock requests", () => {
  it("should display fetched data", async () => {
    const mockJsonPromise = (data: object) => Promise.resolve(data)
    const mockFetchPromise = (response: object) => Promise.resolve({json: () => mockJsonPromise(response)}) 

    jest.spyOn(global, "fetch").mockImplementation((route) => {
      if(typeof route === "string" && route.includes("todo")) {
      return mockFetchPromise([
        {
          id: 1,
          todo: "Mock todo fetch 1",
          priority: "high",
              category: "work"
      },
      {
        id: 2,
          todo: "Mock todo fetch 2",
          priority: "low",
              category: "work"
      }
     ])} 
     
  })
    render(<App />)

    const todo = await screen.findByText("Mock todo fetch 1")

    expect(todo).toBeInTheDocument()
  })
})
