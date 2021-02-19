import { mount } from '@vue/test-utils';

import Agent from '@/Views/Agent.vue';

describe('Agent.vue', () => {
    it('renders the component with default values', done => {
        const wrapper = mount(Agent);

        const stats = wrapper.find('.stats');

        expect(stats).toBeDefined();
        expect(stats.html()).toContain('Calls Taken');
        expect(stats.html()).toContain('Interested');
        expect(stats.html()).toContain('Follow up');
        expect(wrapper.find('base-table')).toBeDefined();
        expect(Number(wrapper.find('.stat-count').text())).toBe(0);

        done();
    });
});
