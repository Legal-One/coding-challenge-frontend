<template>
    <div class="base-table">
        <div class="table-heading">
            <div class="table-header" :key="heading" v-for="heading in headings">
                {{ heading }}
            </div>
        </div>
        <div class="table-body">
            <div class="table-row" v-for="(row, index) in rowData" :key="index">
                <slot name="table-row" :row="row" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        headings: {
            type: Array,
            required: true,
        },

        rowData: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style>
.base-table {
    font-size: var(--font-sub-title);
    margin: 20px 0;
    padding: 20px;

    background: var(--primary-white);
    box-shadow: var(--box-shadow);

    min-width: 100%;
}

.table-heading {
    display: flex;
    justify-content: space-between;

    font-weight: 600;

    margin-bottom: 20px;
}

.table-header {
    display: flex;
    justify-content: flex-start;
}

.table-body {
    margin: 15px 0;
}

.table-row {
    display: flex;
    justify-content: space-between;

    text-align: left;

    margin: 10px -15px;
    padding: 10px 20px;

    border-bottom: 1px solid var(--color-grey);
}

.table-row:last-of-type {
    border: none;
}
</style>
