<script>
import { onMounted } from "vue";
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
      default: ''
    }
  },
  setup(props) {
    onMounted(() => {
      const labelsBarChart = props.labels;
      const dataBarChart = {
        labels: labelsBarChart,
        datasets: [
          {
            label: props.heading || '',
            backgroundColor: "hsl(252, 82.9%, 67.8%)",
            borderColor: "hsl(252, 82.9%, 67.8%)",
            data: props.data,
          },
        ],
      };

      const configBarChart = {
        type: "bar",
        data: dataBarChart,
        options: {},
      };

      var chartBar = new Chart(
        document.getElementById("chartBar"),
        configBarChart
      );
    });
  },
};
</script>
<template>
  <canvas id="chartBar"></canvas>
</template>
