<template>
    <div class="agent-profile">
        <div class="agent">
            <div class="agent-photo">
                <img :src="agentProfile.photo" loading="lazy" :alt="agentProfile.firstName" />
            </div>
            <div class="agent-details">
                <h2 class="agent-name">{{ agentProfile.firstName }} {{ agentProfile.lastName }}</h2>
                <p class="agent-email">{{ agentProfile.email }}</p>
            </div>
        </div>

        <div class="stats">
            <div class="stat">
                <header class="stat-heading">Calls Taken</header>
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
                        <div class="call phonenumber link" @click="viewNumberHistory(row.number)">{{ row.number }}</div>
                        <div class="call last-call">{{ dateAndTime(row.dateTime) }}</div>
                        <div class="call resolution">
                            {{ row.resolution }}
                        </div>
                    </template>
                </base-table>
            </div>

            <div class="chart">
                <apexchart type="donut" :series="series" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { fetchAgentHistory } from '../services';
import { dateAndTime, firstAndLastName } from '../utils';

export default {
    name: 'Agent',

    setup() {
        const router = useRouter();
        const route = useRoute();

        const tableHeadings = ref(['Phone Number', 'Call date and Time', 'Resolution']);
        const rowData = ref([]);
        const agentProfile = ref({
            identifier: '',
            firstName: '',
            lastName: '',
            email: '',
            photo: '',
        });

        const getAllCalls = async () => {
            const agentId = route.params.agentId;

            const {
                data: { calls, agent },
            } = await fetchAgentHistory(agentId);

            rowData.value = calls;
            agentProfile.value = agent;
        };

        const viewNumberHistory = number =>
            router.push({
                name: 'Number',
                params: {
                    number,
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
                            height: 150,
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

        onMounted(getAllCalls);

        return {
            tableHeadings,
            rowData,
            agentProfile,
            firstAndLastName,
            dateAndTime,
            viewNumberHistory,
            totalNumberOfCalls,
            totalNumberOfCompletedCalls,
            totalNumberOfFollowupCalls,
            chartOptions,
            series,
        };
    },
};
</script>

<style scoped>
.agent-profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.agent {
    display: flex;
    align-items: center;

    margin-bottom: 3rem;
    margin-left: auto;
    padding: 2rem;

    text-align: left;

    box-shadow: var(--box-shadow);
    border-radius: 1rem;
}

.agent-photo {
    width: 7rem;
    height: 7rem;

    margin-right: 1rem;

    border-radius: 3rem;
}

.table,
.page-container {
    width: 100%;
}

.page-container {
    display: flex;

    margin-top: 6rem;
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

.agent-name {
    font-size: var(--font-title);
}

.agent-email {
    font-size: var(--font-sub-title);

    margin: 1rem 0;
}

@media screen and (min-width: 992px) {
    .agent-profile {
        padding: 0 20px;
    }

    .table {
        width: 60%;
    }
}
</style>
