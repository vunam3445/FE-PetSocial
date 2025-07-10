import { Button, TextField } from '@mui/material'
import { type ChangeEvent } from 'react'

type Props={
    onNewTodoChange:(e: ChangeEvent<HTMLInputElement>) =>void,
    newTodo:string,
    onAddTodo:() =>void
}
export const CreateTodo = ({
    onNewTodoChange,
    newTodo,
    onAddTodo
} : Props) => {
  return (
    <div>
        <TextField size="small" onChange={onNewTodoChange} value={newTodo}/>
        <Button variant="contained" onClick={onAddTodo}>Thêm</Button>
    </div>
  )
}
