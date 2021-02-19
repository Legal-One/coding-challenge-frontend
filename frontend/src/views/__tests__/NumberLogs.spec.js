import { shallowMount } from "@vue/test-utils";
import NumberLogs from "../NumberLogs.vue";
import merge from "lodash.merge";

const axiosMock = {
  get: async () => ({
    data: {
      callLogs: [{}, {}, {}],
    },
  }),
};

function createWrapper(overrides) {
  const defaultMountingOptions = {
    global: {
      mocks: {
        axios: axiosMock,
        $route: {
          params: { number: "123" },
        },
      },
    },
  };
  return shallowMount(NumberLogs, merge(defaultMountingOptions, overrides));
}

describe("NumberLogs.vue", () => {
  test("renders $route.params.number", async () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain("123");
  });

  test("renders Table", () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain("table");
  });
});
