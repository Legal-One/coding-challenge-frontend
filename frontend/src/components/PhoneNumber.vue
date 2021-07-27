<template>
  <div>
    <div class="root" v-for="item in agentSpecificInfo" :key="item.id">
        <p>Name {{fname}}</p>
        <p>{{item.resolution}}</p>
        <p>{{item.date}}</p>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agentSpecificInfo: [],
      fname:""
      
    };
  },
  props: {
    resolutions: Object,
    all: Object,
  },
  created() {
    this.getSpecifiAgent();

    //   console.log(this.test)
  },
  methods: {
    getSpecifiAgent() {
        var count = 0;
       // var name;
      var allInfo = JSON.parse(JSON.stringify(this.all));
      var resolutions = JSON.parse(JSON.stringify(this.resolutions));
      for(var item in allInfo){
          if(allInfo[item].id == this.$route.params.id){
              this.fname = allInfo[item].name
              
          }
      }
      for(var resolution in resolutions){
          if(resolutions[resolution].agentId == this.$route.params.id){
              this.agentSpecificInfo[count] = {
                  resolution: resolutions[resolution].resolution,
                  date: resolutions[resolution].time,
              }
              count++
          }
      }
    },
  },
};
</script>

<style scoped>
.root{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>