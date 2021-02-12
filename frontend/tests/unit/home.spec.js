import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import home from "@/views/Home.vue";
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const store = new Vuex.Store({
    state: {
        agents: [
            {
                email: "RosePatterson@callcenter.xyz",
                firstName: "Rose",
                identifier: "8273f480-a28b-11e7-b106-e7aa9bbee08e",
                lastName: "Patterson",
                logs: [],
                photo: "https://via.placeholder.com/300/FF805D/333333?text=Rose.Patterson"
            },
            {
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
        ],
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

describe("home", () => {
    const wrapper = shallowMount(home, {
         store,
         localVue,
         router
     })
     
    it("displays the correct log-time or message", () => {
        expect(wrapper.find(".call-log").text()).toBe("No calls has been made by this agent");
    })
});