import React from 'react'

import Text from '../components/atoms/text'

export default {
  title: 'Legal One Coding Challenge Design System/Atoms/Text',
  component: Text,
  argTypes: {
    color: { control: 'color' }
  }
}

const Template = (args) => <Text {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Primary Text',
  primary: true
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Secondary Text',
  primary: false
}

export const Bold = Template.bind({})
Bold.args = {
  children: 'Secondary Text',
  bold: true
}

export const H1 = Template.bind({})
H1.args = {
  size: 'h1',
  children: 'Heading 1'
}

export const H2 = Template.bind({})
H2.args = {
  size: 'h2',
  children: 'Heading 2'
}

export const H3 = Template.bind({})
H3.args = {
  size: 'h3',
  children: 'Heading 3'
}

export const H4 = Template.bind({})
H4.args = {
  size: 'h4',
  children: 'Heading 4'
}

export const H5 = Template.bind({})
H5.args = {
  size: 'h5',
  children: 'Heading 5'
}

export const H6 = Template.bind({})
H6.args = {
  size: 'h6',
  children: 'Heading 6'
}

export const P1 = Template.bind({})
P1.args = {
  size: 'p1',
  children: 'Sub Headings'
}

export const P2 = Template.bind({})
P2.args = {
  size: 'p2',
  children: 'Paragraph Text'
}
