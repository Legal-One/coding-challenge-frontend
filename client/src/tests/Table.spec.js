import { shallowMount } from '@vue/test-utils'
import Table from '../components/table.vue'


describe('Table.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(Table, {
      propsData: {
        headers: ['Agent Name']
      }
    })

    // check the name of the component
    expect(wrapper.vm.$options.name).toMatch('Table')
    expect(wrapper.text()).toContain('Agent Name')
  })
})