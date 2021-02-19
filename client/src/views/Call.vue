<template>
  <div class="call">
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Call',
  data () {
    return {}
  },
  mounted () {
    this.getCallHistory()
    // console.log(this.$route.params.number)
  },
  computed: {
    ...mapGetters(['callHistory'])
  },
  methods: {
    ...mapActions(['fetchCallDetails']),
    async getCallHistory () {
      await this.fetchCallDetails(this.$route.params.number)
    },

    formatDate (date) {
      var d = new Date(date)
      return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
  }
}
</script>

<style lang="scss"></style>
