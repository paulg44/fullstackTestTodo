// Component for adding a todo
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./TodoForm.css";

function TodoForm() {
  const priority = ["high", "medium", "low"];
  const category = ["personal", "work"];

  return (
    <Form className="todoForm">
      {/* Enter todo */}
      <Form.Group controlId="formTodo">
        <Form.Label>Enter todo description</Form.Label>
        <Form.Control type="text"></Form.Control>
      </Form.Group>

      {/* Add priority */}
      <Form.Group>
        <Form.Label htmlFor="priority">Priority</Form.Label>
        <Form.Select id="priority">
          {priority.map((pri) => (
            <option value={pri}>{pri}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Add category */}
      <Form.Group>
        <Form.Label htmlFor="category">Category</Form.Label>
        <Form.Select id="category">
          {category.map((cat) => (
            <option value={cat}>{cat}</option>
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
