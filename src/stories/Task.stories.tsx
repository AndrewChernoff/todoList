import { ComponentStory, ComponentMeta } from '@storybook/react';
import TaskItem from '../TaskItem';
import { action } from '@storybook/addon-actions';

export default {
  title: 'TODOLIST/TaskItem',
  component: TaskItem,
  args: {
    onChangeStatus: action('Change task status'),
    removeTaskHandler: action('Remove task'),
    updateTaskTitle: action('Update task title'),
  },
} as ComponentMeta<typeof TaskItem>;

const Template: ComponentStory<typeof TaskItem> = (args) => <TaskItem {...args} />;

export const TaskItemIsNotDoneStory = Template.bind({});

TaskItemIsNotDoneStory.args = {
    id: 'taskId0001',
    isChecked: false,
    oldtitle: 'React',
    taskClassName: 'isDone'
}

export const TaskItemDoneStory = Template.bind({});

TaskItemDoneStory.args = {
    id: 'taskId033333',
    isChecked: true,
    oldtitle: 'Angular',
    taskClassName: 'notIsDone'
}