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
            <tr v-for="row in getColumnsHtml" :key="JSON.stringify(row)">
              <!-- <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                  </div>
                  <div class="">
                    <div class="text-sm font-medium text-gray-900">
                      {{row.number}}
                    </div>
                  </div>
                </div>
              </td> -->
              <td class="px-6 py-4 whitespace-nowrap" v-for="(rowDeatails,index) in row" :key="index" v-html="rowDeatails" >
               
                
              </td>
              <!-- <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            
               
                
              </td> -->
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
    props:['columns','list','columnList'],
    methods:{
      getNestedObject(data,object){
       
       return data.includes('.')?data.split('.').reduce((o,i)=> o[i], object):object[data]
      }
    },
    computed:{
      getColumnsHtml(){
       return this.$props.list.map((_listData)=>{
        return this.$props.columnList.map((colData)=>{
            switch (colData) {
              case "lastCallTime":
                return `
                 <div class="flex items-center">
                   <div class="flex-shrink-0 h-10 w-10 mx-1">
                    <img class="h-10 w-10 rounded-full" src=${_listData.agent.photo} alt="">
                  </div>
                   <a href='${window.location.origin}/agent/${_listData.agent.identifier}' class="text-indigo-600 hover:text-indigo-900">${_listData.agent.firstName+' '+_listData.agent.lastName} </a>
                  <span class="text-sm font-medium text-gray-900">
                  /  ${new Date(_listData.lastCallTime).getTime()}
                </span> </div>`
                break;
              case "callsCount":
                return `
                 <div class="flex items-center ">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  ${_listData.callsCount}
                </span>
                </div>`
                case "number":
                return `
                 <div class="flex items-center ">
                 <a href='${window.location.origin}/call/${_listData.number}' class="text-indigo-600 hover:text-indigo-900">${_listData.number} </a>
                </div>`
              default:
                return  colData.includes('_link')?`<div class="flex items-center ">
                <a href='${window.location.origin}/${colData.includes('.')?colData.split('.')[0] : colData.replace('_link','')}/${this.getNestedObject(colData.replace('_link','').split('_')[1],_listData)}' class="text-indigo-600 hover:text-indigo-900">${this.getNestedObject(colData.replace('_link','').split('_')[0],_listData)} </a></div>
                `:`<div class="flex items-center">
                <span class="text-sm font-medium text-gray-900">
                  ${this.getNestedObject(colData,_listData)}
                </span>
                 </div>`
            }
          })
        })
      }
    }
}
</script>

<style lang="scss" scoped>

</style>