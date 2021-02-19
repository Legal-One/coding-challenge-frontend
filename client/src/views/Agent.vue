<template>
  <div class="agent">
    <backBtn :path="`/`" name="home" class="back" />
    <div>
      <table id="table">
        <thead>
          <tr>
            <th>Phone number</th>
            <th>Call date and time</th>
            <th>Resolution</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in agent" :key="index">
            <td>{{ item.number }}</td>
            <td>{{ formatDate(item.dateTime) }}</td>
            <td>{{ item.resolution }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <Loader v-else-if="isFetching" /> -->
    <!-- <div class="posts-container" v-else>No Data found</div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BackBtn from '@/components/BackBtn.vue'
// import Loader from '@/components/Loader.vue'

export default {
  name: 'Agent',
  components: { BackBtn },
  data () {
    return {
      isFetching: true,
      agent: []
    }
  },
  mounted () {
    this.getAgent()
  },

  methods: {
    ...mapActions(['fetchAgent']),
    async getAgent () {
      this.isFetching = true
      await this.fetchAgent(this.$route.params.id).then(response => {
        console.log(response)
        this.agent = response
      })
      this.isFetching = false
      console.log(this.agent)
    },

    formatDate (date) {
      var d = new Date(date)
      return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
  }
}
</script>
<style lang="scss">
.agent {
  margin: 0 auto;
  max-width: 810px;
}
</style>
