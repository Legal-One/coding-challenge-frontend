<template>
  <div class="phone-logs">
    <phone-log-item
      v-for="(phoneLog, index) in phoneLogs"
      :phoneLog="phoneLog"
      :key="index">
    </phone-log-item>
  </div>
</template>

<script>
import PhoneLogItem from './PhoneLogItem.vue';

export default {
  name: 'PhoneLogs',
  props: {
    phoneLogs: Array,
  },
  components: {
    'phone-log-item': PhoneLogItem,
  },
};
</script>

<style scoped>

</style>
