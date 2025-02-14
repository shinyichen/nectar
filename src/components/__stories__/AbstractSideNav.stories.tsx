import { Meta, Story } from '@storybook/react';
import { AbstractSideNav, IAbstractSideNavProps } from '../AbstractSideNav';

const meta: Meta = {
  title: 'AbstractSideNav',
  component: AbstractSideNav,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<IAbstractSideNavProps> = (args) => <AbstractSideNav {...args} />;

export const Default = Template.bind({}) as Story<IAbstractSideNavProps>;

Default.args = {};
