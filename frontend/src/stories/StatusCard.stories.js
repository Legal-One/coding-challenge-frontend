import React from 'react'

import StatusCard from '../components/molecules/statusCards'

export default {
  title: 'Legal One Coding Challenge Design System/Molecules/StatusCard',
  component: StatusCard,
  argTypes: {
    color: { control: 'color' }
  }
}

const Template = (args) => <StatusCard {...args} />

export const SampleCard = Template.bind({})
SampleCard.args = {
    status: "Sample Text",
    count: 23
}