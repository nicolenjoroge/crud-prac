import React from 'react'

interface DeleteProps {
    todoid: number,
    onDelete: (id: number) => void
}

const DeleteItem = ({todoid, onDelete}: DeleteProps) => {

  return (
    <div>
        <button onClick={() => onDelete(todoid)}>Delete</button>
    </div>
  )
}

export default DeleteItem