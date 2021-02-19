import { shallowMount } from "@vue/test-utils";
import AgentLogs from "../AgentLogs.vue";
import flushPromises from "flush-promises";
import merge from "lodash.merge";

const axiosMock = {
  get: async () => ({
    data: {
      name: "Madeline Lee",
      agentLogs: [{}, {}, {}],
    },
  }),
};

function createWrapper(overrides) {
  const defaultMountingOptions = {
    global: {
      mocks: {
        axios: axiosMock,
        $route: {
          params: { agentID: "123" },
        },
      },
    },
  };
  return shallowMount(AgentLogs, merge(defaultMountingOptions, overrides));
}

describe("AgentLogs.vue", () => {
  test("renders agent name", async () => {
    const wrapper = createWrapper();
    await flushPromises();
    expect(wrapper.text()).toContain("Madeline Lee");
  });

  test("renders Table", () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain("table");
  });
});
