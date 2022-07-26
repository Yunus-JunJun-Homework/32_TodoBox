import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Item } from "./Item";

export const FuncToDoBox = () => {
  const db_Key = "taskList";
  const [currentTask, setCurrentTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentTask(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!currentTask.length) return;

    const uniqueId = _.uniqueId();
    if (uniqueId === 0) throw new Error("ID can't be 0");

    let data = {
      itemId: uniqueId,
      task: currentTask,
    };

    setData(data);

    setTodos([data, ...todos]);
    setCurrentTask("");
  };

  const setData = (todoItemData) => {
    if (!hasItem()) {
      setItem([todoItemData]);
      return;
    }

    const storageData = JSON.parse(localStorage.getItem(db_Key));

    const data = [todoItemData, ...storageData];
    setItem(data);
  };

  const hasItem = () => {
    let data = localStorage.getItem(db_Key);
    if (!data) return false;

    return true;
  };

  const setItem = (data) => {
    return localStorage.setItem(db_Key, JSON.stringify(data));
  };

  const removeItemHandler = (id) => (event) => {
    event.stopPropagation();

    let todosArr = [...todos];

    const currentItemIndex = todosArr.findIndex((todoItem) => {
      return todoItem.itemId === id;
    });

    todosArr.splice(currentItemIndex, 1);

    setTodos(todosArr);

    if (!todosArr.length) localStorage.removeItem(db_Key);
    else setItem(todosArr);
  };

  const removeItemById = (id) => removeItemHandler(id);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(db_Key));
    if (!data) return;

    setTodos(data);
  }, []);

  const renderItem = () => {
    if (!todos) return null;

    return todos.map((item) => {
      return <Item task={item} key={item.itemId} onRemove={removeItemById} />;
    });
  };

  return (
    <div>
      <div className="mb-3">
        <form className="d-flex">
          <div className="me-3">
            <input
              type="text"
              value={currentTask}
              onChange={handleChange}
              required=""
              className="form-control"
              placeholder="I am going..."
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={addTask}>
            add
          </button>
        </form>
      </div>
      {renderItem()}
    </div>
  );
};
