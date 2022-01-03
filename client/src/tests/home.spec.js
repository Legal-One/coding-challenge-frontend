import { mount } from "@vue/test-utils";
import HomeComponent from "../components/HomeComponent.vue";
import axios from 'axios'
import * as baseService from "../service/baseService";
jest.mock('../service/baseService')
const mockAxios = jest.genMockFromModule('axios')

baseService.getDashboardData = jest.fn().mockImplementation(() => {
    return Promise.resolve({ payload: mockedData })
});

let wrapper;

beforeEach(() => {
     wrapper = mount(HomeComponent)
});

const mockedData=[
    {
        "identifier": "47316182-1fdd-4d31-be81-020e0dc136d6",
        "number": "+49151484522",
        "callsCount": 13,
        "lastCallTime": "2020-10-07T14:50:00.000Z",
        "agent": {
            "identifier": "356b03dc-9ec5-11e7-97a6-d501104f897e",
            "firstName": "Abraham",
            "lastName": "Ellis",
            "email": "Abraham.Ellis@callcenter.xyz",
            "photo": "https://via.placeholder.com/300/E241BC/FFFFFF?text=Rose.Patterson"
        }
    },
    {
        "identifier": "274c1818-6a23-11eb-9439-0242ac130002",
        "number": "+49158544147",
        "callsCount": 3,
        "lastCallTime": "2020-11-09T17:50:00.000Z",
        "agent": {
            "identifier": "e512594e-a34c-11e7-a6cb-0609e42722e2",
            "firstName": "Joel",
            "lastName": "Wagner",
            "email": "Joel.Wagner@callcenter.xyz",
            "photo": "https://via.placeholder.com/300/E241BC/FFFFFF?text=Joel.Wagner"
        }
    }]

mockAxios.get.mockImplementationOnce(() =>
 Promise.resolve({ payload: mockedData }),
)

it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
})

it('get api call on load of component', async () => {
    expect(baseService.getDashboardData).toHaveBeenCalled()
})