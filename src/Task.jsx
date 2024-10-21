import React, { useState, useEffect, useRef } from "react";
import "./task.css";
import deleteImg from "./assets/delete.png";
import taskDeletedImg from "./assets/taskDeletedimg.png";

const Task = () => {
  const [time, setTime] = useState(new Date());
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const inputRef = useRef();
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const displayDateDay = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const addTask = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }
    const newTodo = {
      id: new Date().getTime(),
      text: inputText,
      isComplete: false,
    };
    setTodoList([...todoList, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTask = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isDeleted: true } : todo
      )
    );

    setTimeout(() => {
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, 300);
  };
  const toggleComplete = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };
  return (
    <>
      <div className="container mt-5">
        <header className="header text-center">
          <h2>DAILY PLANNER</h2>
        </header>
        <div className="row mt-4">
          <div className="col">
            <div className="card-body details p-4">
              <h2>{displayDateDay(time)}</h2>
              <h5>Total Task : {todoList.length}</h5>
            </div>
          </div>
        </div>
        <h3 className="mt-4">Task Overview</h3>
        <div className=" taskContainer mt-3">
          {todoList.length === 0 ? (
            <h3 className=" text-secondary text-center mt-5">Add Task Here</h3>
          ) : (
            todoList.map((todo) => (
              <div className="card-body taskList py-3 px-2 mt-2" key={todo.id}>
                <h4
                  onClick={() => toggleComplete(todo.id)}
                  className={`task-name ${todo.isComplete ? "completed" : ""}`}
                >
                  {todo.text}
                </h4>
                <button
                  className="deleteBtn"
                  onClick={() => deleteTask(todo.id)}
                >
                  <img
                    src={todo.isDeleted ? taskDeletedImg : deleteImg}
                    alt="Delete"
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <footer>
        <button
          className="addBtn"
          data-bs-toggle="modal"
          data-bs-target="#addNewTask"
        >
          +
        </button>
        <hr />
      </footer>

      <div
        className="modal fade"
        id="addNewTask"
        tabIndex="1"
        aria-labelledby="addNewTaskLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 id="addNewTaskLabel">Add Task</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="form-group">
                <label className="form-label" htmlFor="taskname">
                  Task Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="taskname"
                  placeholder="Enter the task name"
                  ref={inputRef}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                X
              </button>
              <button
                className="btn btn-outline-success"
                type="submit"
                data-bs-dismiss="modal"
                onClick={addTask}
              >
                ✔
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
