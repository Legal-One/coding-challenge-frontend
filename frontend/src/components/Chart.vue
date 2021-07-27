<template>
  <div>
    <apexchart
      width="500"
      height="330"
      type="bar"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "",
          data: [],
        },
      ],
    };
  },
  mounted() {
    this.populateChart();
  },
  methods: {
    populateChart() {
      console.log(this.data);
      for (var item in this.data) {
        this.options.xaxis.categories.push(this.data[item].number);
        this.series[0].data.push(this.data[item].number_of_calls);
      }
    },
  },
};
</script>
