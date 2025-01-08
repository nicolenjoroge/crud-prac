import React, { ChangeEvent, FC, useState } from 'react';
import './App.css';
import ToDo from './components/ToDo.tsx';


export interface Task {
    taskName: string,
    deadline: number
  }

const App: FC = () => {
  //we are using the state to handle all the parts of the app that actually change like task(when we add, delete etc), deadline(when we add, delete etc) and the list as a whole
  const [task, setTask] = useState<string>("")
  const [deadline, setDeadline] = useState<number>(0)
  const [todo, setTodo] = useState<Task[]>([])

  
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'task'){
      setTask(event.target.value)
    } else {
      setDeadline(Number(event.target.value))
    }
  }

  const addTask = (): void => {
    const newTask = {taskName: task, deadline: deadline}
    setTodo([...todo, newTask])
    setTask("")
    setDeadline(0)
  }

  const completeTask = (taskNameToDelete: string):void => {
    setTodo(todo.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))
  }

  return (
    <div className='App'>
      <div className='header'>
        <div className='inputContainer'>
        <input value={task} type="text" placeholder='Task...' name="task"  onChange={handleChange}/>
        <input value={deadline} type="number" placeholder='Deadline in days' name="deadline" onChange={handleChange}/>
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todoList'>
        {todo.map((task: Task, key: number) => {
          return <ToDo key={key} task={task} completeTask={completeTask}/>
        })}
      </div>
    </div>
  )
}

export default App;
