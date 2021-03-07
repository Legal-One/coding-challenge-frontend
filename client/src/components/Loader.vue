<template>
    <div class="app-loader">
        <img src="@/assets/loader.svg" :style="{ width: width + 'rem' }" />
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 2,
        },
    },
};
</script>
