import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useState } from "react";
import './App.css';

type PropsType = {
    callBack: ( trimmedTask: string) => void
}

const AddItemForm = (props: PropsType) => {

  const [taskName, setTaskName] = useState('')
  const [error, setError] = useState<boolean>(false)

    const onAddTask = () => {
        const trimmedTask = taskName.trim();
        if (trimmedTask && trimmedTask.length > 0 ) {
           props.callBack(trimmedTask)
         } else {
          setError(true);
         }
        setTaskName('');
      }

      const getTaskValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTaskName(e.currentTarget.value)
      }

      const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => e.key === 'Enter' && onAddTask()


    const inputClassName = error ? 'erorInput' : '';

    const buttonStyles = {maxWidth: '38px', maxHeight:'38px', minWidth: '38px', minHeight: '38px'}

  const errorMessage = error && <p style={{color: 'hotpink', margin: 0}}>Please enter some title</p>
    return (
        <div>
        
        {/* <input value={taskName}  className={inputClassName}   onChange={getTaskValue}
        onKeyDown={onKeyPress}/> */}
        <TextField id="outlined-basic" label={ error ? 'Please enter some title' : 'Type your task'} variant="outlined" error={!!error}
        size="small"
        value={taskName}
        onChange={getTaskValue}
        onKeyDown={onKeyPress}
        />

        {/* {errorMessage} */}
        {/* <button onClick={onAddTask}>+</button> */}
        <Button variant="contained" onClick={onAddTask} style={buttonStyles}>+</Button>
      </div>
    )
}

export default AddItemForm;