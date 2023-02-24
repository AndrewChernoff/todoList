import React, { ChangeEvent, useCallback, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions';

import Button from "@mui/material/Button";
import AddItemForm from '../AddItemForm';
import TextField from '@mui/material/TextField';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    callback: {
        description: 'button clicked inside form'
    }
  },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

AddItemFormStory.args = {
    callBack: action('button clicked inside form')
}

const Template1 : ComponentStory<typeof AddItemForm> = (arg) => {
  
    const [taskName, setTaskName] = useState('')
    const [error, setError] = useState<boolean>(true)
  
        const onAddTask = useCallback(() => {
          const trimmedTask = taskName.trim();
          if (taskName.trim() && taskName.trim().length > 0 ) {
            arg.callBack(trimmedTask)
             setTaskName('');
           } else {
             setError(true);
           }
        }, [taskName, arg.callBack])
  
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
  }

export const AddItemFormErrorStory = Template1.bind({})

AddItemFormErrorStory.args = {
    callBack: action('button clicked inside form')
}