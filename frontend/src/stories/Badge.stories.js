import React from 'react'

import Badge from '../components/atoms/badge'

export default {
  title: 'Legal One Coding Challenge Design System/Atoms/Badge',
  component: Badge
}

const Template = (args) => <Badge {...args} />

export const Interested = Template.bind({})
Interested.args = {
  status: 'interested'
}

export const NeedsFollowUp = Template.bind({})
NeedsFollowUp.args = {
  status: 'needs follow up'
}

export const NeedReschedule = Template.bind({})
NeedReschedule.args = {
  status: 'need reschedule'
}

export const NoAnswer = Template.bind({})
NoAnswer.args = {
  status: 'no answer'
}
