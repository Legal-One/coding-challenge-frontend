<template>
    <div class="phone-number">
        <div class="number">
            <h2 class="agent-name">{{ phoneNumber }}</h2>
        </div>

        <div class="stats">
            <div class="stat">
                <header class="stat-heading">Total Calls</header>
                <p class="stat-count">{{ totalNumberOfCalls }}</p>
            </div>

            <div class="stat">
                <header class="stat-heading">Interested</header>
                <p class="stat-count">{{ totalNumberOfCompletedCalls }}</p>
            </div>
            <div class="stat">
                <header class="stat-heading">Follow up</header>
                <p class="stat-count">{{ totalNumberOfFollowupCalls }}</p>
            </div>
        </div>

        <div class="page-container">
            <div class="table">
                <base-table :headings="tableHeadings" :rowData="rowData">
                    <template #table-row="{ row }">
                        <div class="call agent-name link" @click="viewAgentHistory(row.agent.identifier)">
                            {{ getAgentName(row.agent) }}
                        </div>
                        <div class="call last-call">{{ dateAndTime(row.dateTime) }}</div>
                        <div class="call resolution">
                            {{ row.resolution }}
                        </div>
                    </template>
                </base-table>
            </div>

            <div class="chart">
                <apexchart type="donut" height="90%" :series="series" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { fetchCallHistory } from '../services';
import { dateAndTime, getAgentName } from '../utils';

export default {
    name: 'PhoneNumber',
    inject: ['route'],

    setup() {
        const router = useRouter();
        const route = useRoute();

        const tableHeadings = ref(['Agent Name', 'Call date and Time', 'Resolution']);
        const rowData = ref([]);

        const getCallHistory = async () => {
            const number = route.params.number;

            const { data } = await fetchCallHistory(number);

            rowData.value = data;
        };

        const viewAgentHistory = agentId =>
            router.push({
                name: 'Agent',
                params: {
                    agentId,
                },
            });

        const totalNumberOfCalls = computed(() => rowData.value.length);

        const totalNumberOfCompletedCalls = computed(
            () => rowData.value.filter(call => call.resolution === 'interested').length,
        );
        const totalNumberOfFollowupCalls = computed(
            () => rowData.value.filter(call => call.resolution === 'needs follow up').length,
        );

        const totalNumberOfReschedules = computed(
            () => rowData.value.filter(call => call.resolution === 'need reschedule').length,
        );

        const totalNumberOfNoAnswers = computed(
            () => rowData.value.filter(call => call.resolution === 'no answer').length,
        );

        const chartOptions = {
            chart: {
                type: 'donut',
            },
            title: {
                text: 'Calls Resolution',
                align: 'center',
                floating: false,
                style: {
                    fontSize: '16px',
                },
            },
            fontSize: '14px',
            fontWeight: 'bold',
            colors: ['#00a079', '#faf743', '#a920cb', '#fa4344'],
            legend: {
                fontSize: '14px',
            },
            responsive: [
                {
                    options: {
                        chart: {
                            width: 200,
                            height: 100,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
            labels: ['Interested', 'Needs follow up', 'Needs Reschedule', 'No Answer'],
        };

        const series = computed(() => [
            totalNumberOfCompletedCalls.value,
            totalNumberOfFollowupCalls.value,
            totalNumberOfReschedules.value,
            totalNumberOfNoAnswers.value,
        ]);

        const phoneNumber = route.params.number;

        onMounted(getCallHistory);

        return {
            tableHeadings,
            rowData,
            getAgentName,
            dateAndTime,
            viewAgentHistory,
            phoneNumber,
            totalNumberOfCalls,
            totalNumberOfCompletedCalls,
            totalNumberOfFollowupCalls,
            series,
            chartOptions,
        };
    },
};
</script>

<style scoped>
.phone-number {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.number {
    margin-bottom: 1rem;
    margin-left: auto;

    text-align: left;
}

.table,
.page-container {
    width: 100%;
}

.page-container {
    margin-top: 4rem;

    display: flex;
}

.chart {
    flex: 1;

    height: 50rem;

    margin-bottom: 3rem;
}

.link {
    cursor: pointer;
}

.link:hover {
    text-decoration: underline;
}

@media screen and (min-width: 992px) {
    .phone-number {
        padding: 0 20px;
    }

    .table {
        width: 50%;
    }
}
</style>
