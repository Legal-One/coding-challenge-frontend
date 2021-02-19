import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import { routes } from '@/router';

import Home from '@/Views/Home.vue';

describe('Home.vue', () => {
    it('renders the component with default values', done => {
        const router = createRouter({
            history: createWebHistory(),
            routes,
        });

        const wrapper = mount(Home, {
            global: {
                plugins: [router],
            },
        });

        const stats = wrapper.find('.stats');

        expect(stats).toBeDefined();
        expect(stats.html()).toContain('Total Agents');
        expect(stats.html()).toContain('Total Calls');
        expect(wrapper.find('base-table')).toBeDefined();
        expect(Number(wrapper.find('.stat-count').text())).toBe(0);

        done();
    });
});
