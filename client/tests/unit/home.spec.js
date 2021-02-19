import { mount } from '@vue/test-utils';

import Home from '@/Views/Home.vue';

describe('Home.vue', () => {
    it('renders the component with default values', done => {
        const wrapper = mount(Home);

        const stats = wrapper.find('.stats');

        expect(stats).toBeDefined();
        expect(stats.html()).toContain('Total Agents');
        expect(stats.html()).toContain('Total Calls');
        expect(wrapper.find('base-table')).toBeDefined();
        expect(Number(wrapper.find('.stat-count').text())).toBe(0);

        done();
    });
});
