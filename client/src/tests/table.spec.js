import { mount } from '@vue/test-utils';
import TableComponent from '../components/TableComponent.vue'
import { mockedData } from './call.spec';
test('should render component', () => {
    const wrapper= mount(TableComponent)
    expect(wrapper.element).toMatchSnapshot()
})

test('should display columns', () => {
    const wrapper= mount(TableComponent,{
        props:{columns:['Agent Name','Call Date and time','Resolution']}
    })
    expect(wrapper.findAll('th')[0].html()).toContain('Agent Name')
    expect(wrapper.findAll('th')[1].html()).toContain('Call Date and time')
    expect(wrapper.findAll('th')[2].html()).toContain('Resolution')
})

test('should display data', () => {
    const wrapper= mount(TableComponent,{
        props:{
        columns:['Agent Name','Call Date and time','Resolution'],
        columnList:['agent.firstName_link_agentIdentifier','dateTime','resolution.resolution'],
        list:mockedData
    }
    })
    expect(wrapper.findAll('td')[0].html()).toContain('Abraham')
})

test('should return equal rows as data', () => {
    const wrapper= mount(TableComponent,{
        props:{
        columns:['Agent Name','Call Date and time','Resolution'],
        columnList:['agent.firstName_link_agentIdentifier','dateTime','resolution.resolution'],
        list:mockedData
    }
    })

    expect(wrapper.vm.getColumnsHtml).toHaveLength(2)
})
