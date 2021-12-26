<template>
  <div class="agent-log-item">
    <div class="agent-log-item__number">
      {{ phoneLog.number }}
    </div>
    <div class="agent-log-item__date">
      {{ phoneLog.dateTime }}
    </div>
    <div class="agent-log-item__resolutions">
      {{ phoneLog.resolution }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgentLogItem',
  props: {
    phoneLog: Object,
  },
};
</script>

<style scoped>
  .agent-log-item {
    display: grid;
    width: 100%;
    height: 70px;
    grid-template-columns: 3fr 1fr 3fr;
  }
</style>
