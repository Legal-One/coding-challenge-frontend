import { shallowMount, mount } from '@vue/test-utils'
import Home from '../pages/index.vue'
import Table from '../components/table.vue'
import { getCallLogs } from '../services'
import router from '../router'

const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

describe('Home page Tests', () => {
  let wrapper = null

  it('Route Testing', async () => {

    router.push('/')

    // After this line, router is ready
    await router.isReady()

    // render the component
    wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    })

    // check the name of the component
    expect(wrapper.vm.$options.name).toMatch('Home')

  })

  it('Check API call', async () => {
    if (wrapper) {  
      // Check API Call
      const res = await getCallLogs()
      expect(wrapper.vm.callLogs).toStrictEqual(res)
    }
  })

  it('Check Component Props and mounting', async () => {
    if (wrapper) {  
      // Check props of Table Component
      expect(wrapper.getComponent(Table).props()).toEqual({ headers: wrapper.vm.getTableHeaders })
    }
  })
})