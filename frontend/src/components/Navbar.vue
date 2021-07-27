<template>

  <nav class="bg-gray-800">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
       
      </div>
      <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center">
          <p class="text-white text-lg font-bold">Callcenter App</p>
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
            <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Dashboard</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
          </div>
        </div>
      </div>    
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  <div class="sm:hidden" id="mobile-menu">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <a href="#" class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>
      <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
    </div>
  </div>
</nav>
</template>

<script>
export default {

}
</script>

<style>

</style>