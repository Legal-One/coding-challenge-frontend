<template>
  <div>
    <table class="table table-striped table-hover table-bordered">
      <thead>
         <slot name="tableHeader"></slot>
      </thead>
      <tbody>
        <slot name="tableBody"></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  
}
</script>
