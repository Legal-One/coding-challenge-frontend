import { mount, shallowMount } from "@vue/test-utils";
import AgentComponent from "../components/AgentComponent.vue";
import LoaderComponent from "../components/LoaderComponent.vue";
import * as baseService from "../service/baseService";
jest.mock('../service/baseService')
const mockAxios = jest.genMockFromModule('axios')

baseService.getAgentData = jest.fn().mockImplementation(() => {
    return Promise.resolve({ payload: mockedData })
});

mockAxios.create = jest.fn(() => mockAxios)

 export {mockAxios}

let wrapper;

beforeEach(() => {
     wrapper = mount(AgentComponent,{
        global: {
        mocks: {
            $route: {
              params: {
                id: 'f53b3e0e-6a21-11eb-9439-0242ac130002'
              }
            }
          }
        }
        })
});
const mockedData=[
    {
        "identifier": "f53b3e0e-6a21-11eb-9439-0242ac130002",
        "agentIdentifier": "356b03dc-9ec5-11e7-97a6-d501104f897e",
        "number": "+49151484522",
        "dateTime": "2020-10-05T14:48:00.000Z",
        "duration": 230,
        "resolution": {
            "identifier": "f53b3e0e-6a21-11eb-9439-0242ac130002",
            "resolution": "need reschedule"
        }
    },
    {
        "identifier": "0b96031e-6a22-11eb-9439-0242ac130002",
        "agentIdentifier": "356b03dc-9ec5-11e7-97a6-d501104f897e",
        "number": "+49151484522",
        "dateTime": "2020-10-06T13:50:00.000Z",
        "duration": 93,
        "resolution": {
            "identifier": "0b96031e-6a22-11eb-9439-0242ac130002",
            "resolution": "interested"
        }
    }]

mockAxios.get.mockImplementationOnce(() =>
Promise.resolve({ payload: mockedData }),
)

it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
})

it('should show loader', () => {
    const wrapper = mount(AgentComponent, {
        global: {
            mocks: {
                $route: {
                  params: {
                    id: 'f53b3e0e-6a21-11eb-9439-0242ac130002'
                  }
                }
              }
            },
        data() {
          return {
            loading: true
          }
        }
      })

    expect(wrapper.findComponent(LoaderComponent).isVisible()).toBe(true)
})

it('get api call on load of component', async () => {
    expect(baseService.getAgentData).toHaveBeenCalled()
    // expect(mockAxios.get).toHaveBeenCalledWith('/api/agent/:id')
})