import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';

import { routes } from '@/router';

import PhoneNumber from '@/Views/PhoneNumber.vue';

describe('PhoneNumber.vue', () => {
    it('renders the component with default values', done => {
        const route = {
            params: {
                number: '+468878',
            },
        };

        const router = createRouter({
            history: createWebHistory(),
            routes,
        });

        const wrapper = shallowMount(PhoneNumber, {
            global: {
                mocks: {
                    route,
                },
                plugins: [router],
            },
        });

        const stats = wrapper.find('.stats');

        expect(stats).toBeDefined();
        expect(stats.html()).toContain('Total Calls');
        expect(stats.html()).toContain('Interested');
        expect(stats.html()).toContain('Follow up');
        expect(wrapper.find('base-table')).toBeDefined();
        expect(Number(wrapper.find('.stat-count').text())).toBe(0);

        done();
    });
});
