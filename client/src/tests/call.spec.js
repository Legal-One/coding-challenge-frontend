import { mount } from "@vue/test-utils";
import CallComponent from "../components/CallComponent.vue";

import * as baseService from "../service/baseService";
jest.mock('../service/baseService')
const mockAxios = jest.genMockFromModule('axios')

baseService.getCallData = jest.fn().mockImplementation(() => {
    return Promise.resolve({ payload: mockedData })
});

let wrapper;

beforeEach(() => {
    wrapper = mount(CallComponent,{
       global: {
       mocks: {
           $route: {
             params: {
               num: '+49151484522'
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
        "agent": {
            "identifier": "356b03dc-9ec5-11e7-97a6-d501104f897e",
            "firstName": "Abraham",
            "lastName": "Ellis",
            "email": "Abraham.Ellis@callcenter.xyz",
            "photo": "https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson"
        },
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
        "agent": {
            "identifier": "356b03dc-9ec5-11e7-97a6-d501104f897e",
            "firstName": "Abraham",
            "lastName": "Ellis",
            "email": "Abraham.Ellis@callcenter.xyz",
            "photo": "https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson"
        },
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

it('get api call on load of component', async () => {
    expect(baseService.getCallData).toHaveBeenCalled()
})


export {mockedData}