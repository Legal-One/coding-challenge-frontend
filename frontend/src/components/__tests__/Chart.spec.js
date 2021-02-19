import { shallowMount } from "@vue/test-utils";
import Chart from "../Chart.vue";
import VueApexCharts from "vue3-apexcharts";
import merge from "lodash.merge";

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {
      options: {},
      series: ["A", "B"],
    },
    global: {
      plugins: [VueApexCharts],
    },
  };
  return shallowMount(Chart, merge(defaultMountingOptions, overrides));
}

describe("CallLogs.vue", () => {
  test("renders apexchart", () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain("apexchart");
  });

  test("renders apexchart type bar by default", () => {
    const wrapper = createWrapper();
    const apexChart = wrapper.find("apexchart-stub");
    expect(apexChart.attributes().type).toBe("bar");
  });

  test("renders apexchart type donut if received as prop", () => {
    const wrapper = createWrapper({ propsData: { type: "donut" } });
    const apexChart = wrapper.find("apexchart-stub");
    expect(apexChart.attributes().type).toBe("donut");
  });
});
