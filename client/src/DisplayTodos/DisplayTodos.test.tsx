// Test file for Display Todo's

import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import DisplayTodos from "./DisplayTodos";

/* List of Tests 
     - Test list renders
     - Mock the http request to get all todo's
     - Test when edit is clicked, todo text turns into an input & the value can be changed
     - Test once edited the request to server is successful
     - Test a todo can be deleted and request to server is successful
     
*/

// Test list renders and buttons are clickable
describe("List renders and buttons are clickable",  () => {
  it("list renders", () => {
    render(<DisplayTodos />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

    it("edit button is clickable and li turns into an input", async  () => {
      render(<DisplayTodos />);


    });
});
