<template>
    <div class="ml-2">
     <TableComponent :columns="['Phone Number','Number of calls','Last call Detail']" :list="list" :columnList="['number','callsCount','lastCallTime']"/>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getDashboardData } from '../service/baseService';
import TableComponent from './TableComponent.vue';

 const list=ref([])
 onMounted(async () => {
     try {
         let data=await getDashboardData();
         list.value=data.data.payload??[]
     } catch (error) {
         
     }
      
})
</script>

<style lang="scss" scoped>
 .ml-2{
     padding: 2em;
 }
</style>