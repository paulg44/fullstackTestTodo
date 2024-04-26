// Test file for whole application

import { screen, render, fireEvent } from "@testing-library/react";
import App from "./App";


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
    // Mock promise from database and store data
    const mockJsonPromise = (data: object) => Promise.resolve(data)
    // Mock fetched data, simulate response
    const mockFetchPromise = (response: object) => Promise.resolve({json: () => mockJsonPromise(response)}) 

    // Mock a fetch request if it has a todo in string return the promise as mocked data
    jest.spyOn(global, "fetch").mockImplementation((route: RequestInfo) => {
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
     return undefined
     
  })
    render(<App />)

    // Find todo on screen
    const todo = await screen.findByText("Mock todo fetch 1")

    // Expect it to be in the document
    expect(todo).toBeInTheDocument()
  })
})
