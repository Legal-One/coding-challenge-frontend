<template>
  <table
    class="
      table-auto
      mx-auto
      max-w-4xl
      w-full
      whitespace-nowrap
      rounded-lg
      bg-white
      divide-y divide-gray-300
      overflow-hidden
    "
  >
    <thead>
      <tr
        class="bg-gray-900 text-white font-semibold text-sm uppercase px-6 py-4"
      >
        <th
          class="font-semibold text-sm uppercase px-6 py-4"
          :key="head"
          v-for="head in headers"
        >
          {{ head }}
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <slot name="tableRow"></slot>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    }
  },
};
</script>