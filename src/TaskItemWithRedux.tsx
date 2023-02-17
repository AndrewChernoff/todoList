import { ChangeEvent, memo, useCallback } from "react";
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/taskReducer";

type TaskItemProps = {
    todolistId: string
    taskId: string
    isChecked: boolean
    oldtitle: string
    taskClassName: string
}

const TaskItemWithRedux = memo(({taskId, todolistId, isChecked, oldtitle, taskClassName} : TaskItemProps) => {    
   console.log('task');

   const dispatch = useDispatch();

   
   return <li >
    <Checkbox size={'small'} checked={isChecked} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(todolistId, taskId, e.currentTarget.checked))} />
    <EditableSpan Oldtitle={oldtitle} callback={(newTitle) => dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))} className={taskClassName}/>

    <IconButton aria-label="delete" onClick={() => dispatch(removeTaskAC(todolistId, taskId))}>
    <DeleteIcon />
  </IconButton>
  </li>
})

export default TaskItemWithRedux;