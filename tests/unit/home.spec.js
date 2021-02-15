import { shallowMount, mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import {logs, agents, agentLogs, frequency, countLogsAgents, sortedLogs, uniqueLogs} from "./MockData/data";
let wrapper = null;



beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );
  wrapper = shallowMount(Home);
})

describe("Home", () => {
  it("agent is merge into logs to create a combined logs", () => {
    expect(wrapper.vm.mergeAgentsToLogs(logs, agents)).toEqual(agentLogs);
  });

  it("return object of agent call frequency", () => {
    const merge = wrapper.vm.mergeAgentsToLogs(logs, agents)
    expect(wrapper.vm.frequency(merge)).toEqual(frequency);
  });

  it("return array of object logs with the agent count frequency of calls", () => {
    const merge = wrapper.vm.mergeAgentsToLogs(logs, agents);
    const frequency = wrapper.vm.frequency(merge);

    expect(wrapper.vm.mergeFrequency(merge, frequency)).toEqual(countLogsAgents);
  });

  it("call logs is sorted by datetime", () => {
    expect(wrapper.vm.sortCallLogs(logs)).toEqual(sortedLogs);
  });

  it("call logs return unique logs", () => {
    expect(wrapper.vm.callLogs(logs)).toEqual(uniqueLogs);
  });

  it("show call fetch", async () => {
    const wrapper = shallowMount(Home, {
      data() {
        return {
          agentLogs: uniqueLogs
        }
      }
    })
    expect(fetch).toHaveBeenCalledTimes(4)
    expect(wrapper.vm.agentLogs).toEqual(uniqueLogs)
    expect(wrapper.vm.agentLogs[0].agent.firstName).toBe('Joel')

  });
});
