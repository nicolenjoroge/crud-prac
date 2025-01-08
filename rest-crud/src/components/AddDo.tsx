import React, { ChangeEvent, useState } from 'react'
import { Todos } from '../App.tsx';


interface AddProps {
    onAdd: (newItem: Todos) => void;
}

const AddDo = ({onAdd}: AddProps) => {

    const [id, setId] = useState<number>(0)
    const[title, setTitle] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'id') {
            setId(Number(e.target.value))
        }
        else {
            setTitle(e.target.value)
        }
    }
    onAdd({id, title})

    setId(0)
    setTitle('')
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' name='id' placeholder='add Id' value={id} onChange={handleChange}/>
            <input type='text' name='title' placeholder='add title' value={title} onChange={handleChange}/>
            <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default AddDo