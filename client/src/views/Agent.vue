<template>
  <div class="agent">
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Agent',
  data () {
    return {}
  },
  mounted () {
    this.getAgent()
    // console.log(this.agent)
  },
  computed: {
    ...mapGetters(['agent'])
  },
  methods: {
    ...mapActions(['fetchAgent']),
    async getAgent () {
      await this.fetchAgent(this.$route.params.id)
    },

    formatDate (date) {
      var d = new Date(date)
      return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
  }
}
</script>
<style lang="scss"></style>
