import React from 'react'

// Always start with the props, in this case id and ondelete fxn prop is essential
interface DeleteProps {
    itemid: number,
    onDelete: (id: number) => void
}


const DeleteDo = ({ itemid, onDelete }: DeleteProps) => {
    // The onDelete should be taking the set variables to handle now here is id
    const handleDelete = () => {
        onDelete(itemid)
    }
    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default DeleteDo