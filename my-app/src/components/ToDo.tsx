import React from 'react'
import { Task } from '../App.tsx'

interface Props {
    task: Task,
    completeTask(taskNameToDelete: string): void
}

const ToDo = ({task, completeTask}: Props) => {
  return (
    <div className='task'>
        <div className='content'>
        <span>{task.taskName}</span> 
        <span>{task.deadline}</span></div>
        <button onClick={() => {completeTask(task.taskName)}}>X</button>
        </div>

  )
}

export default ToDo