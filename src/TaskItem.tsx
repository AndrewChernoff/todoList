import { ChangeEvent, memo, useCallback } from "react";
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

type TaskItemProps = {
    id: string
    isChecked: boolean
    oldtitle: string
    onChangeStatus: (status: boolean, taskId: string) => void
    removeTaskHandler: (taskId: string) => void
    updateTaskTitle: (newTitle:string, taskId: string) => void
    taskClassName: string
}

const TaskItem = memo(({id, isChecked, oldtitle, onChangeStatus, removeTaskHandler, taskClassName, updateTaskTitle} : TaskItemProps) => {    
   
   return <li>
    <Checkbox size={'small'} checked={isChecked} onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeStatus(e.currentTarget.checked, id)} />
    <EditableSpan Oldtitle={oldtitle} callback={(newTitle) => updateTaskTitle(newTitle, id)} className={taskClassName}/>

    <IconButton aria-label="delete" onClick={() => removeTaskHandler(id)}>
    <DeleteIcon />
  </IconButton>
  </li>
})

export default TaskItem;