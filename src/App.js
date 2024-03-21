import React, { useState, useEffect } from "react";
import "./App.css";
import TodoContainer from "./components/TodoContainer";
import TodoItem from "./components/TodoItem";

function App() {

  useEffect(() => {
    document.title = "To-Do";
  }, []);

  // The state of the todo items.
  const [todoItems, setTodoItems] = useState([
    {
      key: 0,
      completed: false,
      title: "Do the laundry",
    },
  ]);

  // functions to delete, complete, and add todo items.
  const deleteTodo = (key) => {
    const newTodoItems = todoItems.filter((item) => item.key !== key);
    setTodoItems(newTodoItems);
  };

  const completeTodo = (key) => {
    const newTodoItems = todoItems.map((item) => {
      if (item.key === key) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodoItems(newTodoItems);
  };

  const addTodo = (title) => {
    const key = Date.now();
    //... deconstructs the prev list and then reassembles it with the new item
    setTodoItems((prev) =>[...prev, {
      key: key,
      title: title,
      completed: false,
    }])
  };

  // The main app component
  return (
    <div className="App">
      <header className="header">
        <h1>My Todo List</h1>
      </header>
      <div className="body-container">
        <TodoContainer name="My daily Tasks"addTodo={addTodo}>
          {
            todoItems.map((item) =>(
              <TodoItem
              title={item.title}
              key={item.key}
              completed={item.completed}
              onDelete={() => deleteTodo(item.key)}
              onComplete={() => completeTodo(item.key)}
              />
            ))
          }
        </TodoContainer>
      </div>
    </div>
  );
}

export default App;
