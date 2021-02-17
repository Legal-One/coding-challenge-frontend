<template>
    <div class="home">
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

        <div class="chart"></div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
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
        };
    },
};
</script>

<style scoped>
.home {
    display: flex;
    align-items: center;
}

.table {
    width: 100%;
}

.chart {
    background: var(--color-purple);

    flex: 1;
}

.link {
    cursor: pointer;
}

.link:hover {
    text-decoration: underline;
}

@media screen and (min-width: 768px) {
    .home {
        padding: 0 20px;
    }

    .table {
        width: 50%;
    }
}
</style>
