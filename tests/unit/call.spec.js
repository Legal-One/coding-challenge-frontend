import { shallowMount } from "@vue/test-utils";
import Call from "@/views/Call.vue";
import {logs, agents, resolutions, mergeLogResAgent} from "./MockData/data";
let wrapper = null;



beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  const $route = {
    params: '+49151484522'
  }

  wrapper = shallowMount(Call, {
    data() {
     return {
        agentLogResolutions: []
      }
    },
    mocks: {
      $route
    } 
  });
})

describe("Agent", () => {

  it("should call fetch", () => {
    expect(fetch).toHaveBeenCalledTimes(3)
  });

  it("should merge resolution, agents and logs", () => {
    const agentLogs = wrapper.vm.fetchLogsByNumber(wrapper.vm.$route.params, logs);
    expect(wrapper.vm.mergeLogsResolutionAgent(agentLogs, agents, resolutions)).toEqual(mergeLogResAgent);
  });
});
