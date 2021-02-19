<template>
  <div>
    <apexchart :type="type" :options="options" :series="series" class="chart"></apexchart>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "bar"
    },
    options: {
      type: Object,
      required: true
    },
    series: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
.chart {
  width: 100%;
}

@media (min-width: 540px) {
  .chart {
    width: 540px;
  }
}

.apexcharts-yaxis-title text {
  letter-spacing: 1px !important;
  font-size: 10px;
}
</style>