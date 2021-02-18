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
    padding: 20px 20px 0;

    background: var(--primary-white);
    box-shadow: var(--box-shadow);

    border-radius: 1rem;

    min-width: 100%;
}

.table-heading {
    display: flex;
    justify-content: space-between;

    font-weight: 600;

    margin: 0 -20px 20px;
    padding: 0 20px 1rem;

    border-bottom: 2px solid var(--color-grey);
}

.table-row > *,
.table-heading > * {
    width: 33.33%;
}

.table-header {
    display: flex;
    justify-content: flex-start;
}

.table-body {
    margin: 15px 0 0;
}

.table-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    text-align: left;

    margin: 0 -20px;
    padding: 13px 20px;

    box-shadow: var(--box-shadow);
}

.table-row:last-of-type {
    border: none;
}
</style>
