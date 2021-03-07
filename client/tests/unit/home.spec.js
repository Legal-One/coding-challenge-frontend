import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import flushPromises from 'flush-promises';

import { routes } from '@/router';

import Home from '@/Views/Home.vue';
import BaseTable from '@/components/BaseTable.vue';

import { fetchAllCallHistory } from '@/services';
import { allCallHistory } from '../../tests/mocks';

jest.mock('@/services');

describe('Home.vue', () => {
    it('renders the component with default values', async done => {
        const router = createRouter({
            history: createWebHistory(),
            routes,
        });

        fetchAllCallHistory.mockResolvedValueOnce({ data: { ...allCallHistory } });

        const apexchart = {
            name: 'ApexChart',
            template: `<div type="bar" width="100%" height="300" />`,
        };

        const wrapper = mount(Home, {
            global: {
                stubs: {
                    apexchart,
                },
                plugins: [router],
                components: {
                    BaseTable,
                },
            },
        });

        await flushPromises();

        const stats = wrapper.find('.stats');
        const tableRows = wrapper.findAll('div.table-row');

        expect(stats).toBeDefined();
        expect(stats.html()).toContain('Total Agents');
        expect(stats.html()).toContain('Total Calls');
        expect(Number(wrapper.find('.stat-count').text())).toBe(4);

        expect(wrapper.find('table-body')).toBeDefined();
        expect(tableRows.length).toEqual(1);

        done();
    });
});
