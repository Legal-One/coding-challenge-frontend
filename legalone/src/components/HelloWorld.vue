<template>
  <div class="hello">
    
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'HelloWorld',
  data(){
    return{
      data: {}
    }
  },
  props: {
    msg: String
  },
  created(){
var url =
        "http://localhost:8080/agents";
      axios.get(url).then((response) => {
        console.log(response["data"]);
      });

},
methods:{
   
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
