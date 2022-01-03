import { mount } from "@vue/test-utils";
import NavComponent from "../components/NavComponent.vue";
it('renders correctly', () => {
    const wrapper = mount(NavComponent)
    expect(wrapper.element).toMatchSnapshot()
})

it('has a link to dashboard', () => {
    const wrapper = mount(NavComponent)
     expect(wrapper.get('router-link').isVisible()).toBe(true)
})