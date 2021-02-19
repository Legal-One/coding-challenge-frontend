import { shallowMount } from '@vue/test-utils';

import App from '@/App.vue';

describe('App.vue', () => {
    it('renders the nav section of the page', done => {
        const wrapper = shallowMount(App, {
            stubs: ['router-link', 'router-view'],
        });

        const navBlock = wrapper.find('#nav');

        expect(navBlock).toBeDefined();
        expect(navBlock.html()).toContain('All Calls');
        done();
    });
});
