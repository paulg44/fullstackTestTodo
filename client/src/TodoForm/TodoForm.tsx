// Component for adding a todo
import "./TodoForm.css";

function TodoForm() {
  const priority = ["high", "medium", "low"];
  const category = ["personal", "work"];

  return (
    <form className="todoForm">
      <div className="inputs">
        {/* Enter todo */}
        <label htmlFor="todo">Enter todo description</label>
        <input type="text" id="todo"></input>
        {/* Add priority */}
        <label htmlFor="priority">Priority</label>
        <select id="priority">
          {priority.map((pri) => (
            <option value={pri}>{pri}</option>
          ))}
        </select>
        {/* Add category */}
        <label htmlFor="category">Category</label>
        <select id="category">
          {category.map((cat) => (
            <option value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button type="submit">Add to List</button>
    </form>
  );
}

export default TodoForm;
