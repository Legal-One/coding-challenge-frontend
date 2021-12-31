<template>
    <div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>

              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" v-for="item in columns" :key="item">
                {{item}}
              </th>
            
            </tr> 
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="row in list" :key="row.identifier">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{row.number}}
                    </div>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap">
                <div class="flex items-center ml-4">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{row.callsCount}}
                </span>
                </div>
                
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                 <div class="flex items-center ml-4">
                   <div class="flex-shrink-0 h-10 w-10 mx-1">
                    <img class="h-10 w-10 rounded-full" :src="row.agent.photo" alt="">
                  </div>
                   <router-link :to="{ name: 'agent', params: { id: row.agent.identifier }}" class="text-indigo-600 hover:text-indigo-900">{{row.agent.firstName+' '+row.agent.lastName}}</router-link>
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{new Date(row.lastCallTime).getTime()}}
                </span>
                </div>
                
              </td>
            </tr>

            <!-- More people... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    setup () {
        

        return {}
    },
    props:['columns','list']
}
</script>

<style lang="scss" scoped>

</style>