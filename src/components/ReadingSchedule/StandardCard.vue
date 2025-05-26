<template>
  <div class="options">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

  .options {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

</style>
