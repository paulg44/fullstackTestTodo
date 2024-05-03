// Test file for whole application

import { screen, render, fireEvent, waitFor } from "@testing-library/react";
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
  // Clear previous mocks
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should display fetched data", async () => {
    // Mock promise from database and store data
    const mockJsonPromise = (data) => Promise.resolve(data)
    // Mock fetched data, simulate response
    const mockFetchPromise = (response) => Promise.resolve({json: () => mockJsonPromise(response)}) 

    // Mock a fetch request if it has a todo in string return the promise as mocked data
    jest.spyOn(global, "fetch").mockImplementation((route) => {
      if(route.includes("todo")) {
    
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

  it("should delete a todo", async () => {
    // Mock promise from database and store data
    const mockJsonPromise = (data) => Promise.resolve(data)
    // Mock fetched data, simulate response
    const mockFetchPromise = (response) => Promise.resolve({json: () => mockJsonPromise(response)}) 

      jest.spyOn(global, "fetch").mockImplementation((url, config) => {
        if(url === "api/todo/1" && config?.method === "DELETE") {
          return mockFetchPromise([])
        }
        return undefined
      })

      render(<App/>)

   
        const todo = screen.queryByText("Mock toto fetch 1")
        expect(todo).not.toBeInTheDocument()
  
  })
})
