import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, memo, useCallback, useState } from "react";
import './App.css';

type PropsType = {
    callBack: ( trimmedTask: string) => void
}

const AddItemForm = memo((props: PropsType) => {
  
  const [taskName, setTaskName] = useState('')
  const [error, setError] = useState<boolean>(false)

      const onAddTask = useCallback(() => {
        const trimmedTask = taskName.trim();
        if (taskName.trim() && taskName.trim().length > 0 ) {
           props.callBack(trimmedTask)
           setTaskName('');
         } else {
           setError(true);
         }
      }, [taskName, props.callBack])

      const getTaskValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTaskName(e.currentTarget.value)
      }

      const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
        if (error) setError(false)
        if(e.key === 'Enter') {
           onAddTask()
        }
      } 


    const buttonStyles = {maxWidth: '38px', maxHeight:'38px', minWidth: '38px', minHeight: '38px'}

    return (
        <div>
        <TextField id="outlined-basic" label={ error ? 'Please enter some title' : 'Type your task'} variant="outlined" error={!!error}
        size="small"
        value={taskName}
        onChange={getTaskValue}
        onKeyDown={onKeyPress}
        />

        <Button variant="contained" onClick={onAddTask} style={buttonStyles}>+</Button>
      </div>
    )
})

export default AddItemForm;

function useCallBack() {
  throw new Error("Function not implemented.");
}
