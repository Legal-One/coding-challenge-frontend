import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import agent from "@/views/_agent.vue";
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const store = new Vuex.Store({
    state: {
        agent: {
            email: "RosePatterson@callcenter.xyz",
            firstName: "Rose",
            identifier: "8273f480-a28b-11e7-b106-e7aa9bbee08e",
            lastName: "Patterson",
            logs: [
                {
                    agentIdentifier: "8273f480-a28b-11e7-b106-e7aa9bbee08e",
                    dateTime: "2020-08-09T12:50:00.000Z",
                    duration: 56,
                    identifier: "b84874bf-ea9c-4b85-a6dd-f0098ec84d25",
                    number: "+49221514231",
                    resolutions: {
                        identifier: "b84874bf-ea9c-4b85-a6dd-f0098ec84d25",
                        resolution: "need reschedule"
                    }
                }
            ],
            photo: "https://via.placeholder.com/300/FF805D/333333?text=Rose.Patterson"
        }
    }
});
const router = new VueRouter();

describe("agent", () => {
    const wrapper = shallowMount(agent, {
         store,
         localVue,
         router
     })
    it("displays the correct agent's name", () => {
        expect(wrapper.find(".agent-name").text()).toBe("Rose Patterson");
    })
});