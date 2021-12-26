<template>
  <div class="agent-details">
    <div class="agent-details__photo">
      <img class="agent-details__photo__img" :src="agent.photo" />
    </div>
    <div class="agent-details__name">
      {{ agent.firstName + " " + agent.lastName}}
    </div>
    <div class="agent-details__email">
      {{ agent.email }}
    </div>
    <div class="agent-details__logs">

    </div>
  </div>
</template>

<script>

export default {
  name: 'AgentDetails',
  props: {
    agent: Object,
  },
  data() {
    return {
      currentAgent: this.agent,
      lastCall: {},
    };
  },
  created() {
    // this.currentAgent = this.agent;
  },
  methods: {

  },
};
</script>

<style lang="scss">
  .agent-details {
    display: grid;
    justify-content: center;
    grid-template-columns: 42px auto;
    grid-column-gap: 10px;
    width: 100%;

    &__photo {
      grid-row-start: 1;
      grid-row-end: 3;
      margin-right: 10px;
      grid-column: 1;
      align-self: center;
      &__img {
        width: 42px;
        height: 42px;
      }
    }

    &__name {
      grid-row: 1;
      grid-column: 2;
      align-self: center;
      justify-self: self-start;
      font-weight: bold;
    }

    &__email {
      grid-row: 2;
      grid-column: 2;
      align-self: center;
      justify-self: self-start;
    }
  }
</style>
