<template>
    <div class="home">
        <div class="table">
            <base-table :headings="tableHeadings" :rowData="rowData">
                <template #table-row="{ row }">
                    <div class="call phonenumber link">{{ row.phoneNumber }}</div>
                    <div class="call calls-count">{{ row.numberOfCalls }}</div>
                    <div class="call last-call">
                        <span @click="viewAgentHistory" class="link agent-link">{{
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

import { fetchAllCalls } from '../services';
import { hourAndMinute } from '../utils';

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
            } = await fetchAllCalls();

            rowData.value = calls;

            callData.value.totalAgents = totalAgents;
            callData.value.totalCalls = totalCalls;
        };

        const getAgentName = ({ firstName, lastName }) => `${firstName} ${lastName}`;

        const viewAgentHistory = () => router.push({ name: 'About' });

        onMounted(getAllCalls);

        return {
            tableHeadings,
            rowData,
            callData,
            getAgentName,
            hourAndMinute,
            viewAgentHistory,
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
