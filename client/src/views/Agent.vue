<template>
    <div class="agent-profile">
        <div class="agent">
            <h2 class="agent-name">{{ agentProfile.firstName }} {{ agentProfile.lastName }}</h2>
            <p class="agent-email">{{ agentProfile.email }}</p>
        </div>

        <div class="table">
            <base-table :headings="tableHeadings" :rowData="rowData">
                <template #table-row="{ row }">
                    <div class="call phonenumber link" @click="viewNumberHistory(row.number)">{{ row.number }}</div>
                    <div class="call last-call">{{ dateAndTime(row.dateTime) }}</div>
                    <div class="call resolution" :class="getCallResolutionClass(row.resolution)">
                        {{ row.resolution }}
                    </div>
                </template>
            </base-table>
        </div>

        <div class="chart"></div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { fetchAgentHistory } from '../services';
import { dateAndTime, getAgentName } from '../utils';

export default {
    name: 'Agent',
    inject: ['route'],

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

        const viewAgentHistory = () => router.push({ name: 'About' });

        const viewNumberHistory = number =>
            router.push({
                name: 'Number',
                params: {
                    number,
                },
            });

        const getCallResolutionClass = callResolution => {
            switch (callResolution) {
                case 'need reschedule':
                    return 'bg-purple';

                case 'interested':
                    return 'bg-green';

                case 'no answer':
                    return 'bg-red';

                case 'needs follow up':
                    return 'bg-yellow';

                default:
                    return 'bg-blue';
            }
        };

        onMounted(getAllCalls);

        return {
            tableHeadings,
            rowData,
            agentProfile,
            getAgentName,
            dateAndTime,
            viewAgentHistory,
            viewNumberHistory,
            getCallResolutionClass,
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

.agent-email {
    font-size: var(--font-sub-title);

    margin: 1rem 0;
}

@media screen and (min-width: 768px) {
    .agent-profile {
        padding: 0 20px;
    }

    .table {
        width: 50%;
    }
}
</style>
