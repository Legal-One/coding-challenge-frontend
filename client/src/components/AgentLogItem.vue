<template>
  <div class="agent-log-item">
    <div class="agent-log-item__number">
      <router-link :to="`/call/${phoneLog.number}`">
        {{ phoneLog.number }}
      </router-link>
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

<style lang="scss">
  .agent-log-item {
    display: grid;
    align-items: center;
    width: 100%;
    height: 30px;
    grid-template-columns: 3fr 1fr 3fr;
    background-color: #fff;

    &:hover {
      background-color: #dedede;
    }
  }
</style>
