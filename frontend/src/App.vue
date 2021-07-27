<template>
  <div class="flex flex-col h-screen bg-gray-300">
    <Navbar />
    <router-view />
  </div>
</template>



<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>

