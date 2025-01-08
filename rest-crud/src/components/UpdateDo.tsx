import React, { ChangeEvent, useState } from 'react'
import { Todos } from '../App.tsx'

// For the props in this case, we have to import our original todos from the app already and an onUpdate fxn
interface UpdateProps {
    todos: Todos,
    onUpdate: (id:number, updatedItem: Partial<Todos>) => void
}

const UpdateDo = ({todos, onUpdate}: UpdateProps) => {
// Have a state to handle the update changes basically everything that will need to be updated in this case its only title
    const [update, setUpdate] = useState(todos.title)

    // match the id with the updated change variable
    const handleUpdate = () => {
        onUpdate(todos.id, {title: update})
    }

  return (
    <div>
        <h2>Update {todos.title}</h2>
        {/* For any input element always make sure to handleChange */}
        <input type='text' name='updatedTitle' placeholder='updated' value={update} onChange={(e: ChangeEvent<HTMLInputElement>) => setUpdate(e.target.value)}/>
        <button onClick={handleUpdate}>Update Item</button>
    </div>
  )
}

export default UpdateDo