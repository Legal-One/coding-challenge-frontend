<template>
  <div id="app">
    <router-view
      :all="this.all"
      :resolutions="this.resolutions"
      v-if="Object.keys(all).length > 0"
    ></router-view>
  </div>
</template>

<script>
//import Home from "./components/Home.vue";
import axios from "axios";

export default {
  name: "App",
  components: {},
  data() {
    return {
      agents: [],
      logs: [],
      resolution: [],
      phoneNumbers: [],
      results: [],
      all: {},
      agentDetails: {},
      agentNames: [],
      resolutions: {},
    };
  },
  created() {
    this.getAgents();
  },
  methods: {
    getAgents() {
      axios.get("http://localhost:8080/agents").then((response) => {
        this.agents = response.data;
        // this.getInfo()
      });
      axios.get("http://localhost:8080/logs").then((response) => {
        this.logs = response.data;
      });
      axios.get("http://localhost:8080/resolution").then((response) => {
        this.resolution = response.data;
        this.getInfo();
      });
    },
    getInfo() {
      var numberRepetiton = {};
      var agentIdWithNumbers = {};
      var resolutions = {};
      var times = {};
      var names = {};
      var allInfo = {};
      var ids = {};
      // console.log("numberRepetiton ", numberRepetiton)
      // console.log("agentIdWithNumbers ", agentIdWithNumbers)
      // console.log("resolutions ", resolutions)
      // console.log("times ", times)
      // console.log("names ", names)
      // console.log("allInfo ", allInfo)
      // console.log("ids ", ids)


















































      //  var m = 0;
      for (var i = 0; i < this.logs.length; i++) {
        if (numberRepetiton[this.logs[i].number]) {
          numberRepetiton[this.logs[i].number] += 1;
          times[this.logs[i].number] = this.logs[i].dateTime;
        } else {
          numberRepetiton[this.logs[i].number] = 1;
          // ids[this.logs[i].number] = this.logs[i].agentIdentifier
        }
      }
      //   console.log(numberRepetiton)

      for (var b = 0; b < this.logs.length; b++) {
        for (var n = 0; n < this.logs.length; n++) {
          if (
            Date.parse(this.logs[n].dateTime.substring(0, 10)) >
            Date.parse(this.logs[b].dateTime.substring(0, 10))
          ) {
            times[this.logs[n].number] = this.logs[n].dateTime;
          }
        }
      }
      // console.log(times)

      for (var j = 0; j < this.logs.length; j++) {
        for (var number in numberRepetiton) {
          if (this.logs[j].number == number) {
            agentIdWithNumbers[number] = this.logs[j].agentIdentifier;
          }
        }
      }
      //  console.log(agentIdWithNumbers)

      for (var p = 0; p < this.logs.length; p++) {
        if (this.logs[p].dateTime == times[this.logs[p].number]) {
          ids[this.logs[p].number] = this.logs[p].agentIdentifier;
        }
      }
      for (var k = 0; k < this.agents.length; k++) {
        for (var id in ids) {
          if (ids[id] == this.agents[k].identifier) {
            names[id] = this.agents[k].firstName;
          }
        }
      }
      console.log(names);

      var c = 0;
      for (var phoneNumber in numberRepetiton) {
        allInfo[c] = {
          name: names[phoneNumber],
          count: numberRepetiton[phoneNumber],
          number: phoneNumber,
          id: ids[phoneNumber],
          time: times[phoneNumber].substring(11, 16),
        };
        c++;
      }
      console.log(allInfo)
      for (var q = 0; q < this.logs.length; q++) {
        for (var w = 0; w < this.resolution.length; w++) {
          if (this.logs[q].identifier == this.resolution[w].identifier) {
            resolutions[w] = {
              identifier: this.logs[q].identifier,
              number: this.logs[q].number,
              resolution: this.resolution[w].resolution,
              time: this.logs[q].dateTime,
              agentId: this.logs[q].agentIdentifier,
            };
            //console.log(this.resolution[w].resolution)
          }
        }
      }
      console.log(resolutions)

      this.all = allInfo;
      this.resolutions = resolutions;
    },
  },
};
</script>

<style>
</style>