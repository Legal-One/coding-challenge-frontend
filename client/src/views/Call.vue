<template>
  <div class="call">
    <backBtn :path="`/`" name="home" class="back" />

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
</template>

<script>
import { mapActions } from 'vuex'
import BackBtn from '@/components/BackBtn.vue'

export default {
  name: 'Call',
  components: { BackBtn },
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
      await this.fetchCallDetails(this.$route.params.number).then(response => {
        console.log(response)
        this.callHistory = response
        // console.log(this.callHistory)
      })
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
