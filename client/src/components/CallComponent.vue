<template>
    <div class="pl-2">
     <div v-if="loading" class="flex justify-center items-center"><LoaderComponent /></div>
     <TableComponent v-else :columns="['Agent Name','Call Date and time','Resolution']" :list="list" :columnList="['agent.firstName_link_agentIdentifier','dateTime','resolution.resolution']"/>
    </div>
</template>

<script>
import { getCallData } from '../service/baseService';
import LoaderComponent from './LoaderComponent.vue';
import TableComponent from './TableComponent.vue';

 export default {
    data() {
        return {
            loading: true,
            list: null,
            error: null,
        };
    },
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(() => this.$route.params, () => {
            this.fetchData();
        }, 
        // fetch the data when the view is created and the data is
        // already being observed
        { immediate: true });
    },
    methods: {
        async fetchData() {
            this.error = this.post = null;
            this.loading = true;
            try {
                let list = await getCallData(this.$route.params.num.replace('+',''));
                 this.list = list.data.payload?.map((data)=>{
                    let str=data.dateTime.split('T')
                    let time=new Date(data.dateTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                    return {...data,dateTime:str[0]+' '+time}
                });
                this.loading=false;
            }
            catch (error) {
                this.loading=false;
                this.error = error.toString();
            }
        },
    },
    components: { LoaderComponent, TableComponent }
}

</script>

<style lang="scss" scoped>
 .pl-2{
     padding: 2em;
 }
</style>