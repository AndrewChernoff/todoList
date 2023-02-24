import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppWithRedux from '../AppWithRedux';
import { ReduxStoreProviderDecorator } from '../ReduxStoreProviderDecorator';

export default {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;
 
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux />;

export const AppWithReduxStory = Template.bind({});

AppWithReduxStory.args = {
    id: 'taskId0001',
    isChecked: false,
    oldtitle: 'React',
    taskClassName: 'isDone'
}