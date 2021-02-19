<template>
  <div>
    <table>
      <tr>
        <th v-for="header of headers" :key="header">{{ header }}</th>
      </tr>
      <tr v-for="(row, index) of rows" :key="row" :class="{ highlight: index % 2 == 1 }">
        <td v-for="(cell, _, index) of row" :key="cell">
          <p v-if="headers[index] == 'Phone Number'">
            <router-link :to="`/call/${cell}`">{{ cell }}</router-link>
          </p>
          <p v-else-if="headers[index] == 'Last Call Details'">
            <router-link :to="`/agent/${cell.agentIdentifier}`">{{ cell.name }}</router-link>
            - {{ cell.date }}
          </p>
          <p v-else-if="headers[index] == 'Agent Name'">
            <router-link :to="`/agent/${cell.agentIdentifier}`">{{ cell.name }}</router-link>
          </p>
          <p v-else>{{ cell }}</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  margin: 2rem 0;
  border-spacing: 0;
  color: #1e3a8a;
}

th {
  text-transform: uppercase;
  text-align: left;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #6b7280;
}

th,
td {
  padding: 0 1rem;
  border-radius: 4px;
  overflow: hidden;
}

a {
  color: #1e3a8a;
}

.highlight {
  background-color: #dbeafe;
}
</style>