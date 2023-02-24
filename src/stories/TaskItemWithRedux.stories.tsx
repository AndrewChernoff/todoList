import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useSelector } from 'react-redux';
import { TaskType } from '../App';
import AppWithRedux from '../AppWithRedux';
import { ReduxStoreProviderDecorator } from '../ReduxStoreProviderDecorator';
import { AppStateType } from '../state/store';
import TaskItemWithRedux from '../TaskItemWithRedux';

export default {
  title: 'TODOLIST/TaskItemWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TaskItemWithRedux>;

const TaskItemWithReduxCopy = () => {
    const task = useSelector<AppStateType, TaskType>(store => store.tasks['todolistId1'][0])
    return <TaskItemWithRedux todolistId={'todolistId1'} taskId={task.id} isChecked={task.isDone} oldtitle={task.title} taskClassName={'isDone'} />
}
 
const Template: ComponentStory<typeof TaskItemWithRedux> = (args) => <TaskItemWithReduxCopy />;

export const TaskItemWithReduxStory = Template.bind({});

/* AppWithReduxStory.args = {
    id: 'taskId0001',
    isChecked: false,
    oldtitle: 'React',
    taskClassName: 'isDone'
} */