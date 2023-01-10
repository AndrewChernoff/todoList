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

  const errorMessage = error && <p style={{color: 'hotpink', margin: 0}}>Please enter some title</p>
    return (
        <div>
        
        <input value={taskName}  className={inputClassName}   onChange={getTaskValue}
        onKeyDown={onKeyPress}/>
        {errorMessage}
        <button onClick={onAddTask} /* disabled={taskName.trim().length > 0 ? false : true} */>+</button>
      </div>
    )
}

export default AddItemForm;