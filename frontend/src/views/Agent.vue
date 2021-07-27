<template>
  <div class="root">
    <div class="bodyElement flex mt-4 justify-around">
      <div class="data">
        <table>
          <thead>
            <tr class="header">
              <th>Number</th>
              <th>Call date and time</th>
              <th>Resolution</th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            <tr v-for="item in agentSpecificInfo" :key="item.id">
              <td>{{ item.number }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.resolution }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="chart">
        <apexchart
          width="500"
          height="330"
          type="donut"
          :options="options"
          :series="series"
        ></apexchart>
      </div> -->
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      agentSpecificInfo: [],
      id: this.$route.params.number,
      options: {},
      series: [44, 55, 41, 17, 15],
    };
  },
  props: {
    resolutions: Object,
    all: Object,
  },
  created() {
    this.getSpecifiAgent();
   // this.populateTheChart();
    //   console.log(this.test)
  },
  methods: {
    getSpecifiAgent() {
      var count = 0;
      var resolutions = JSON.parse(JSON.stringify(this.resolutions));
      // console.log(resolutions[0].number)
      for (var item in resolutions) {
        if (resolutions[item].number == this.id) {
          this.agentSpecificInfo[count] = {
            number: resolutions[item].number,
            date: resolutions[item].time,
            resolution: resolutions[item].resolution,
          };
          count++;
        }
      }
      //this.options.xaxis.categories.push(this.id);
    //  this.series[0].data.push(resolutions[item].resolution);
      // console.log(this.agentSpecificInfo);
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 2rem;
}

table {
  text-align: left;
  position: relative;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
}

th {
  background: #51ab6d;
  position: sticky;
  top: 0; /* Don't forget this, required for the stickiness */
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}
</style>