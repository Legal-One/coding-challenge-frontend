import { shallowMount, mount } from "@vue/test-utils";
import Agent from "@/views/Agent.vue";
import {logs, resolutions, mergeResolutions} from "./MockData/data";
let wrapper = null;



beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  const $route = {
    params: 'e512594e-a34c-11e7-a6cb-0609e42722e2'
  }

  wrapper = shallowMount(Agent, {
    data() {
     return {
        logResolutions: []
      }
    },
    mocks: {
      $route
    } 
  });
})

describe("Agent", () => {

  it("should call fetch", () => {
    expect(fetch).toHaveBeenCalledTimes(2)
  });

  it("resolution is merge into logs to create a combined logs", () => {
    const agentLogs = wrapper.vm.fetchLogsById(wrapper.vm.$route.params, logs)
    expect(wrapper.vm.mergeLogsResolution(agentLogs, resolutions)).toEqual(mergeResolutions);
  });
});
