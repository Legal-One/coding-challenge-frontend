import React from 'react'

import Chart from '../components/molecules/chart'

export default {
  title: 'Legal One Coding Challenge Design System/Molecules/Chart',
  component: Chart
}

const Template = (args) => <Chart {...args} />

export const ChartData = Template.bind({})
ChartData.args = {
  data: [
    {
      color: '#434343',
      text: 'Text 1',
      percentage: 20
    },
    {
      color: '#656565',
      text: 'Text 2',
      percentage: 38
    },
    {
      color: '#878787',
      text: 'Text 3',
      percentage: 12
    },
    {
      color: '#a9a9a9',
      text: 'Text 4',
      percentage: 30
    }
  ]
}

export const ChartColored = Template.bind({})
ChartColored.args = {
  data: [
    {
      color: 'red',
      text: 'Text 1',
      percentage: 40
    },
    {
      color: 'blue',
      text: 'Text 2',
      percentage: 25
    },
    {
      color: 'green',
      text: 'Text 3',
      percentage: 35
    }
  ]
}