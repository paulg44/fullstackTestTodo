// Component for adding a todo
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./TodoForm.css";
import { ChangeEvent, FormEvent, useState } from "react";

/* TODO 
  - create form (done)
  - add useStates for each input (done)
  - create function for add to list button
*/

function TodoForm() {
  // Use States for form
  const [entertodo, setEnterTodo] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Priority and Category option arrays
  const priorityArr = ["high", "medium", "low"];
  const categoryArr = ["personal", "work"];

  function handleTodoChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEnterTodo(e.target.value);
  }

  function handlePriorityChange(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSelectedPriority(e.target.value);
    console.log(selectedPriority);
  }
  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSelectedCategory(e.target.value);
    console.log(selectedCategory);
  }

  async function handleAddNewTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const addNewTodoToDatabase = {
      todo: entertodo,
      priority: selectedPriority,
      category: selectedCategory
    }

    await fetch("api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addNewTodoToDatabase)
    })
    window.location.reload()
    console.log(`Successfully added new todo`)
  }

  return (
    <Form className="todoForm" style={{ width: "50%" }} onSubmit={handleAddNewTodo}>
      {/* Enter todo */}
      <Form.Group controlId="formTodo">
        <Form.Label>Enter todo description</Form.Label>
        <Form.Control type="text" onChange={handleTodoChange}></Form.Control>
      </Form.Group>

      {/* Add priority */}
      <Form.Group>
        <Form.Label htmlFor="priority">Priority</Form.Label>
        <Form.Select
          id="priority"
          aria-label="Select Priority"
          value={selectedPriority}
          onChange={handlePriorityChange}
        >
          <option></option>
          {priorityArr.map((pri, index) => (
            <option key={index} value={pri}>
              {pri}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Add category */}
      <Form.Group>
        <Form.Label htmlFor="category">Category</Form.Label>
        <Form.Select
          id="category"
          aria-label="Select Category"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option></option>
          {categoryArr.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary">
        Add to List
      </Button>
    </Form>
  );
}

export default TodoForm;
