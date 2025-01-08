// This app is to perform async-await on API yay
import React, { useEffect, useState } from 'react';
import './App.css';
import AddDo from './components/AddDo.tsx';
import UpdateDo from './components/UpdateDo.tsx';
import DeleteDo from './components/DeleteDo.tsx';

// Always remember to first create your interface for the objects you want to use
export interface Todos {
  id: number;
  title: string;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const App: React.FC = () => {
  // Set your states, 1. for the whole application, for errors and loading if needed
  const [todos, setTodos] = useState<Todos[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  // useEffect is perfect for performing the fetch on the first render make sure that the dependancy array is set right to avoid loops
  useEffect(() => {
    const fetchPosts = async () => {
      setisLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/todos`);
        const items = (await response.json()) as Todos[];
        // set the state application with the results/response of the fetch 
        setTodos(items);
      } catch (e: any) {
        setError(e.message);
        // Perform error handling always
      } finally {
        setisLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // This is an async for POST requests: always add the props in the parameter handle
  const handleAdd = async (newItem: Todos) => {
    try {
      const res = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      });
      if (!res.ok) {
        console.log('Ngori!');
        return;
      }
      const addedItem = (await res.json()) as Todos;
      // It handles the add by only changing the state of the app with the added item
      setTodos((prevTodos) => [...prevTodos, addedItem]);
    } catch (err: any) {
      console.log('Error occurred');
    }
  };

  // Handles the put requests: pass the props yet again
  const handleUpdate = async (id: number, updatedItem: Partial<Todos>) => {
    try {
      // The id always has to be at the end of the api so you update a specific item
      const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
      }
      )
      if (!res.ok) {
        console.log('Failed to perform your request')
      }
      const updateItem = (await res.json()) as Todos
      // Map through all the items to check for a matched id and only then do we change the state of the app with the update
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? updateItem : todo))
      );
    } catch (err: any) {
      console.log('Umehata mbaya')
    }
  }

  // Handles delete
  const handleDelete = async (itemid: number) => {
    // Just like Put, always include the id at the end of the api
    try {
      const res = await fetch(`${BASE_URL}/todos/${itemid}`, {
        method: 'DELETE'
      })
      if(!res.ok) {
        console.log('Failed')
      }
      await res.json() as Todos
      // Filter through the app by only showing everything that does not match the id of the delete
      setTodos(todos.filter((todo) => todo.id !== itemid))
    } catch (e: any) {
      console.log('Error')
    }
  }

  return (
    <div className="App">
      <h1>HTTP Requests Json</h1>
      <AddDo onAdd={handleAdd} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.id}: {todo.title}
              <DeleteDo itemid={todo.id} onDelete={handleDelete}/>
              <UpdateDo todos={todo} onUpdate={handleUpdate} />
            </li>
          ))}
        </ul>
      )}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default App;
