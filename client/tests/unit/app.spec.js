import { shallowMount } from '@vue/test-utils';

import App from '../../src/App.vue';

describe('App.vue', () => {
    it('renders the nav section of the page', done => {
        const wrapper = shallowMount(App);
        const navBlock = wrapper.find('#nav');

        expect(navBlock).toBeDefined();
        done();
    });
});
