import React, { ChangeEvent, useState } from 'react'
import { Todo } from '../App.tsx'

interface AddProps {
    onCreate: (newTodo: Omit<Todo, 'id'>) => void
}

const AddItem = ({onCreate}: AddProps) => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [dueDate, setDueDate] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !description || !dueDate) return;
    

    onCreate({title, description, status: "pending", dueDate})

    setTitle('')
    setDescription('')
    setDueDate('')
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name === 'description') {
            setDescription(e.target.value)
        }
        else {
            setDueDate(e.target.value)
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' name='title' placeholder='title' value={title} onChange={handleChange} />
            <input type='text' name='description' placeholder='description' value={description} onChange={handleChange} />
            <input type='text' name='dueDate' placeholder='dueDate' value={dueDate} onChange={handleChange} />
            <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default AddItem