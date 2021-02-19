import { shallowMount } from "@vue/test-utils";
import CallLogs from "../CallLogs.vue";
import merge from "lodash.merge";

const axiosMock = {
  get: async () => ({
    data: {
      calls: [
        { number: "+49151484522", calls: 13 },
        { number: "+49151484512", calls: 3 },
        { number: "+49151483322", calls: 1 },
      ],
    },
  }),
};

function createWrapper(overrides) {
  const defaultMountingOptions = {
    global: {
      mocks: {
        axios: axiosMock,
      },
    },
  };
  return shallowMount(CallLogs, merge(defaultMountingOptions, overrides));
}

describe("CallLogs.vue", () => {
  test("renders chart", () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain("chart");
  });

  test("renders table", () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain("table");
  });
});
