// Test file for whole application

import { screen, render } from "@testing-library/react";
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

  it("list renders", () => {
    render(<App />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
