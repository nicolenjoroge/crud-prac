import React, { ChangeEvent, useState } from 'react'
import { Todos } from '../App.tsx';

// Start with your props, in this case just an onAdd prop
interface AddProps {
    onAdd: (newItem: Todos) => void;
}

const AddDo = ({ onAdd }: AddProps) => {
// Create states with all of the variables that you want to POST to the API in this case its id and title
    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>('')

    // On submission you should make sure the app doesnt refresh and the onAdd fxn picks up the changed variables then resets the fields to blank
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onAdd({ id, title })

        setId(0)
        setTitle('')
    }
// Handle the value changes in the inputs in the case of forms in order to send the data correctly
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'id') {
            setId(Number(e.target.value))
        }
        else {
            setTitle(e.target.value)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='id' placeholder='add Id' value={id} onChange={handleChange} />
                <input type='text' name='title' placeholder='add title' value={title} onChange={handleChange} />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AddDo