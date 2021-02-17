<template>
    <div class="phone-number">
        <div class="number">
            <h2 class="agent-name">{{ phoneNumber }}</h2>
        </div>

        <div class="table">
            <base-table :headings="tableHeadings" :rowData="rowData">
                <template #table-row="{ row }">
                    <div class="call agent-name link" @click="viewAgentHistory(row.agent.identifier)">
                        {{ getAgentName(row.agent) }}
                    </div>
                    <div class="call last-call">{{ dateAndTime(row.dateTime) }}</div>
                    <div class="call calls-count">{{ row.resolution }}</div>
                </template>
            </base-table>
        </div>

        <div class="chart"></div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
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

        const phoneNumber = route.params.number;

        onMounted(getCallHistory);

        return {
            tableHeadings,
            rowData,
            getAgentName,
            dateAndTime,
            viewAgentHistory,
            phoneNumber,
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
    .phone-number {
        padding: 0 20px;
    }

    .table {
        width: 50%;
    }
}
</style>
