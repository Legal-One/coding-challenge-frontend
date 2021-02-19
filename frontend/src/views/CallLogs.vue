<template>
  <div class="container">
    <h1>Calls Summary</h1>
    <Chart :options="chartOptions" :series="chartSeries" />
    <Table :headers="tableHeaders" :rows="tableRows" />
  </div>
</template>

<script>
import Chart from "../components/Chart";
import Table from "../components/Table";
export default {
  data() {
    return {
      tableHeaders: ["Phone Number", "Number of Calls", "Last Call Details"],
      tableRows: [],
      chartOptions: {},
      chartSeries: []
    };
  },
  components: {
    Chart,
    Table
  },
  methods: {
    fillChart() {
      const chartCategories = [];
      const chartData = [];
      this.tableRows.forEach(row => {
        chartCategories.push(row.number);
        chartData.push(row.calls);
      });

      this.chartOptions = {
        chart: {
          foreColor: "#6b7280",
          fontFamily: "Helvetica, Arial, sans-serif",
          toolbar: {
            tools: {
              download: false
            }
          }
        },
        colors: ["#1E3A8A"],
        grid: {
          show: true,
          borderColor: "#E5E7EB"
        },
        xaxis: {
          categories: chartCategories,
          labels: {
            style: {
              fontSize: "12px",
              fontWeight: 500
            }
          }
        },
        dataLabels: {
          style: {
            fontSize: "12px"
          }
        },
        yaxis: {
          title: {
            text: "NUMBER OF CALLS",
            style: {
              fontSize: "12px",
              fontWeight: 800,
              cssClass: "apexcharts-yaxis-title"
            }
          },
          labels: {
            style: {
              fontSize: "12px"
            }
          }
        }
      };

      this.chartSeries.push({
        name: "Number of Calls",
        data: chartData
      });
    }
  },
  async created() {
    try {
      const response = await this.axios.get("http://localhost:8080/calls");
      this.tableRows = response.data.calls;
      this.fillChart();
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>