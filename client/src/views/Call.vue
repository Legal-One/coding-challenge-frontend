<template>
  <div class="call">
    <backBtn :path="`/`" name="home" class="back" />
    <div v-if="callHistory.length > 0">
      <table id="table">
        <thead>
          <tr>
            <th>Agent Name</th>
            <th>Call date and time</th>
            <th>Resolution</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in callHistory" :key="index">
            <td>{{ item.agentName }}</td>
            <td>{{ formatDate(item.dateTime) }}</td>
            <td>{{ item.resolution }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Loader v-else-if="isFetching" />
    <div class="centered" v-else>No Data found</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BackBtn from '@/components/BackBtn.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'Call',
  components: { BackBtn, Loader },
  data () {
    return {
      isFetching: false,
      callHistory: []
    }
  },
  mounted () {
    this.getCallHistory()
    // console.log(this.$route.params.number)
  },

  methods: {
    ...mapActions(['fetchCallDetails']),
    async getCallHistory () {
      this.isFetching = true
      await this.fetchCallDetails(this.$route.params.number).then(response => {
        // console.log(response)
        this.callHistory = response
      })
      this.isFetching = false
    },

    formatDate (date) {
      var d = new Date(date)
      return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
  }
}
</script>

<style lang="scss">
.call {
  margin: 0 auto;
  max-width: 810px;
}
</style>
