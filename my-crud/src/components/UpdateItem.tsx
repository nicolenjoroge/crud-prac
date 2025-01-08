import React, { useState } from 'react'
import { Todo } from '../App.tsx'

interface UpdateProps {
    todo: Todo,
    onUpdate: (id: number, updatedData: Partial<Todo>) => void 
}

const UpdateItem = ({todo, onUpdate}: UpdateProps) => {

    const [status, setStatus] = useState(todo.status)

    const handleUpdate = () => {
        onUpdate(todo.id, {status})
    }

  return (
    <div>
        <h3>Update: {todo.title}</h3>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
        </select>
        <button onClick={handleUpdate}>Update Status</button>
    </div>
  )
}

export default UpdateItem