<template>
  <div class="root">
      <p class="flex justify-center mt-6 text-xl text-green-700">Call Center Data Visualizations</p>
    <div class="flex flex-row justify-between mt-12">
    <div class="table w-1/2 ">
      <table id="customers" class=" ml-32">
        <tr>
          <th>Phone Number</th>
          <th>Number of calls</th>
          <th>Last call details</th>
        </tr>
        <tr v-for="(item,i) in all" :key="i">
          <router-link
            :to="`/call/${item.number}`"
            tag="td"
            class="cursor-pointer"
            >{{ item.number }}</router-link
          >
          <router-link :to="`/agent/${item.id}`" tag="td">{{
            item.count
          }}</router-link>
          <router-link :to="`/agent/${item.id}`" tag="td" class="cursor-pointer"
            >{{ item.name }}/{{ item.time }}</router-link
          >
        </tr>
      </table>
    </div>
    <div class="chart w-1/2">
      <apexchart
        width="500"
        height="330"
        type="bar"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    all: Object,
  },
  data: function () {
    return {
      fname: "",
      cat:[],
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
  created() {
    //console.log(this.series[0].data[0])
    // var test = JSON.parse(JSON.stringify(this.all));
    // console.log(test[0].time.substring(11, 16));
    this.populateTheChart();
  },
  methods: {
    populateTheChart(){
     // console.log(this.series)
     //var allData
      var allData = JSON.parse(JSON.stringify(this.all));
        //console.log(allData.length)
        for(var item in allData){
          this.options.xaxis.categories.push(allData[item].number)
          this.series[0].data.push(allData[item].count)
          
         // this.series[0].name.push(allData[item].name)
          //console.log(this.series[0].data)
        //  console.log(item)
          }
    //le.log(this.series)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  color: #42b983;
}
.child {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
td {
  text-align: left;
}
</style>
