<template>
  <button class="root-card">
    <h2>{{ name }}</h2>
    <p>{{ address }}</p>
    <p class="last-visited">Last Visited: {{ lastVisited }}</p>
  </button>
</template>

<script setup lang="ts">

  defineProps({
    name: String,
    address: String,
    lastVisited: String

  })
</script>

<style scoped>
  .root-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 16px;
    background: linear-gradient(135deg, rgba(192, 253, 239, 0.561) 0%, #8cecff6a 100%);
    border: 1px solid rgba(255, 255, 255, 0.181);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    cursor: pointer;
    width: 100%;
  }

  .call-card h2 {
    margin: 0 0 8px 0;
    font-size: 18px;
    text-align: left;

  }

  .call-card p {
    text-align: left;
  }

</style>
