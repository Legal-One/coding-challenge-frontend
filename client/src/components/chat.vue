<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    heading: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "bar",
    },
    colors: {
      type: Array,
      default: [
        "rgb(133, 105, 241)",
        "rgb(164, 101, 241)",
        "rgb(101, 143, 241)",
      ],
    },
  },
  methods: {
    setUpBarChart() {
      const dataBarChart = {
        labels: this.labels,
        datasets: [
          {
            label: this.heading || "",
            backgroundColor: "hsl(252, 82.9%, 67.8%)",
            borderColor: "hsl(252, 82.9%, 67.8%)",
            data: this.data,
          },
        ],
      };
      const configBarChart = {
        type: "bar",
        data: dataBarChart,
        options: {},
      };
      this.initializeChart(configBarChart);
    },
    setUpPieChart() {
      const dataPieChart = {
        labels: this.labels,
        datasets: [
          {
            label: this.heading || "",
            backgroundColor: this.colors,
            borderColor: "hsl(252, 82.9%, 67.8%)",
            data: this.data,
            hoverOffset: 4,
          },
        ],
      };
      const configPieChart = {
        type: "pie",
        data: dataPieChart,
        options: {},
      };
      this.initializeChart(configPieChart);
    },
    initializeChart(chartConfig) {
      const chartRef = this.$refs.chartRef;
      new Chart(chartRef, chartConfig);
    },
  },
  mounted() {
    if (this.type === "bar") {
      this.setUpBarChart();
    } else {
      this.setUpPieChart();
    }
  },
};
</script>
<template>
  <canvas id="chartBar" ref="chartRef"></canvas>
</template>
