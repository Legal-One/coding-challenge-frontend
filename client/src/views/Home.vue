<template>
    <div class="home">
        <div class="stats">
            <div class="stat">
                <header class="stat-heading">Total Agents</header>
                <p class="stat-count">{{ callData.totalAgents }}</p>
            </div>
            <div class="stat">
                <header class="stat-heading">Total Calls</header>
                <p class="stat-count">{{ callData.totalCalls }}</p>
            </div>
        </div>

        <div class="page-container">
            <div class="table">
                <base-table :headings="tableHeadings" :rowData="rowData">
                    <template #table-row="{ row }">
                        <div class="call phonenumber link" @click="viewNumberHistory(row.phoneNumber)">
                            {{ row.phoneNumber }}
                        </div>
                        <div class="call calls-count">{{ row.numberOfCalls }}</div>
                        <div class="call last-call">
                            <span @click="viewAgentHistory(row.lastCall.agent.identifier)" class="link agent-link">{{
                                getAgentName(row.lastCall.agent)
                            }}</span>
                            <span> / {{ hourAndMinute(row.lastCall.dateTime) }}</span>
                        </div>
                    </template>
                </base-table>
            </div>

            <div class="chart">
                <apexchart type="bar" width="100%" height="300" :options="chartOptions" :series="series" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchAllCallHistory } from '../services';
import { hourAndMinute, getAgentName } from '../utils';

export default {
    name: 'Home',
    inject: ['route'],

    setup() {
        const tableHeadings = ref(['Phone Number', 'Number of Calls', 'Last Call Details']);
        const rowData = ref([]);
        const callData = ref({ totalAgents: 0, totalCalls: 0 });

        const chartOptions = computed(() => {
            const phoneNumbers = rowData.value.map(callData => callData.phoneNumber);

            return {
                chart: {
                    id: 'all-calls',
                },
                title: {
                    text: 'Frequency of Calls',
                    align: 'center',
                    floating: false,
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    },
                },
                xaxis: {
                    categories: [...phoneNumbers],
                },
            };
        });

        const series = computed(() => {
            const values = rowData.value.map(callData => callData.numberOfCalls);

            return [
                {
                    name: 'Number of Calls',
                    data: [...values],
                },
            ];
        });
        const router = useRouter();

        const getAllCalls = async () => {
            const {
                data: { calls, totalAgents, totalCalls },
            } = await fetchAllCallHistory();

            rowData.value = calls;

            callData.value.totalAgents = totalAgents;
            callData.value.totalCalls = totalCalls;
        };

        const viewAgentHistory = agentId =>
            router.push({
                name: 'Agent',
                params: {
                    agentId,
                },
            });

        const viewNumberHistory = number =>
            router.push({
                name: 'Number',
                params: {
                    number,
                },
            });

        onMounted(getAllCalls);

        return {
            tableHeadings,
            rowData,
            callData,
            getAgentName,
            hourAndMinute,
            viewAgentHistory,
            viewNumberHistory,
            chartOptions,
            series,
        };
    },
};
</script>

<style scoped>
.home {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
}

.table,
.page-container {
    width: 100%;
}

.page-container {
    display: flex;

    margin: 6rem 0 0;
}

.link {
    cursor: pointer;
}

.link:hover {
    text-decoration: underline;
}

@media screen and (min-width: 992px) {
    .home {
        padding: 0 20px;
    }

    .table {
        width: 50%;
    }
}
</style>
