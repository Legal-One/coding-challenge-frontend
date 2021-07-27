<template>
  <div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-2/4">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                    v-for="heading in headings" :key="heading.item"
                  >
                    {{ heading }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in rows_data" :key="item.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ item.number }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ item.number_of_calls }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ item.agent_name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ hourAndMinute(item.date) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-for="agent in aggreageted_data" :key="agent.id">
      {{ agent.agent_name }}
    </div> -->
  </div>
</template>

<script>
import { hourAndMinute } from "../utils";

export default {
  props: {
    rows_data: Array,
    headings: Array,
  },
  methods: {
    hourAndMinute: hourAndMinute,
  },
};
</script>

<style>
</style>