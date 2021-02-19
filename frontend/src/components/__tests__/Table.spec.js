import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import Table from "../Table.vue";
import router from "../../router/index";
import merge from "lodash.merge";

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {
      headers: [
        "Phone Number",
        "Number of Calls",
        "Last Call Details",
        "Agent Name",
      ],
      rows: [
        {
          number: "+49151484522",
          calls: 13,
          lastCall: {
            agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
            name: "Abraham Ellis",
            date: "7/9/2020 14:50",
          },
          agent: {
            agentIdentifier: "356b03dc-9ec5-11e7-97a6-d501104f897e",
            name: "Abraham Ellis",
          },
        },
        {
          number: "+49158544147",
          calls: 3,
          lastCall: {
            agentIdentifier: "e512594e-a34c-11e7-a6cb-0609e42722e2",
            name: "Joel Wagner",
            date: "9/10/2020 17:50",
          },
          agent: {
            agentIdentifier: "e512594e-a34c-11e7-a6cb-0609e42722e2",
            name: "Joel Wagner",
          },
        },
        {
          number: "+49151783331",
          calls: 3,
          lastCall: {
            agentIdentifier: "6fe55f02-a8f3-11e7-b037-c33c31bca71f",
            name: "Madeline Lee",
            date: "12/0/2020 11:50",
          },
          agent: {
            agentIdentifier: "6fe55f02-a8f3-11e7-b037-c33c31bca71f",
            name: "Madeline Lee",
          },
        },
      ],
    },
    global: {
      plugins: [router],
    },
    stubs: {
      RouterLink: RouterLinkStub,
    },
  };
  return shallowMount(Table, merge(defaultMountingOptions, overrides));
}

describe("Table.vue", () => {
  test("renders a table header for each header it receives as a prop", () => {
    expect.assertions(4);
    const wrapper = createWrapper();
    const tableHeaders = wrapper.findAll("th");
    expect(tableHeaders[0].text()).toBe("Phone Number");
    expect(tableHeaders[1].text()).toBe("Number of Calls");
    expect(tableHeaders[2].text()).toBe("Last Call Details");
    expect(tableHeaders[3].text()).toBe("Agent Name");
  });

  test("renders a data table row for each row it receives as a prop", () => {
    const wrapper = createWrapper();
    const tableRows = wrapper.findAll("tr");
    expect(tableRows.length - 1).toBe(3);
  });

  test("highlights every data table row with even index", () => {
    const wrapper = createWrapper();
    const tableRows = wrapper.findAll("tr");
    expect(tableRows[2].classes()).toContain("highlight");
  });

  test("renders a table cell for each cell in a table row", () => {
    const wrapper = createWrapper();
    const tableCells = wrapper.findAll("td");
    expect(tableCells.length).toBe(12);
  });

  test("renders RouterLinks with numbers for table cells that are numbers", () => {
    expect.assertions(3);
    const wrapper = createWrapper();
    const routerLinks = wrapper.findAll("router-link-stub");
    expect(routerLinks[0].attributes().to).toBe("/call/+49151484522");
    expect(routerLinks[3].attributes().to).toBe("/call/+49158544147");
    expect(routerLinks[6].attributes().to).toBe("/call/+49151783331");
  });

  test("renders agent names as RouterLinks with agentID for table cells that are last call details", () => {
    expect.assertions(3);
    const wrapper = createWrapper();
    const routerLinks = wrapper.findAll("router-link-stub");
    expect(routerLinks[1].attributes().to).toBe(
      "/agent/356b03dc-9ec5-11e7-97a6-d501104f897e"
    );
    expect(routerLinks[4].attributes().to).toBe(
      "/agent/e512594e-a34c-11e7-a6cb-0609e42722e2"
    );
    expect(routerLinks[7].attributes().to).toBe(
      "/agent/6fe55f02-a8f3-11e7-b037-c33c31bca71f"
    );
  });

  test("renders RouterLinks with agentID for table cells that are agent names", () => {
    expect.assertions(3);
    const wrapper = createWrapper();
    const routerLinks = wrapper.findAll("router-link-stub");
    expect(routerLinks[2].attributes().to).toBe(
      "/agent/356b03dc-9ec5-11e7-97a6-d501104f897e"
    );
    expect(routerLinks[5].attributes().to).toBe(
      "/agent/e512594e-a34c-11e7-a6cb-0609e42722e2"
    );
    expect(routerLinks[8].attributes().to).toBe(
      "/agent/6fe55f02-a8f3-11e7-b037-c33c31bca71f"
    );
  });

  test("renders no RouterLinks for table cells that are neither numbers nor last call details nor agent names", () => {
    const wrapper = createWrapper();
    const tableCells = wrapper.findAll("td");
    expect(tableCells[1].html()).not.toContain("router-link")
    expect(tableCells[5].html()).not.toContain("router-link")
    expect(tableCells[9].html()).not.toContain("router-link")
  })
});
