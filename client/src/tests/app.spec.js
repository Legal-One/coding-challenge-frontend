import { mount } from "@vue/test-utils";
import App from "../App.vue";

export const factoryRouter=(comp)=>{
    return mount(comp, {
        global: {
          plugins: [router]
        }
      })
}


it('renders correctly', () => {
    const wrapper = mount(App)
    expect(wrapper.element).toMatchSnapshot()
  })
