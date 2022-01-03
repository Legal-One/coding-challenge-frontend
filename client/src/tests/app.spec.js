import { mount } from "@vue/test-utils";
import App from "../App.vue";
import router from "../routes";

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

  it('renders page on route', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = factoryRouter(App)
    expect(wrapper.html()).toContain('<title>Menu</title>')

  })
