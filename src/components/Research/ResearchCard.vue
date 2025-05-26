<template>
  <div class="cardContainer" @click="$emit('open', title)">
    <div class="clickable-card">
      <div class="card-header">
        <h2 class="title">{{ title }}</h2>
        <h2 class="arrow">›</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    title: string
  }>()
  const title = props.title

  /*
  const emit = defineEmits(['open', 'request-delete'])


  function confirmDelete() {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      emit('request-delete', title)
    }
  }
  */
</script>

<style scoped>
  .cardContainer {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    padding: 5px;
  }

  .title {
    padding-left: 0.5em;
  }

  .instruction {
    color: #888;
    font-size: 0.85rem;
    margin-top: 4px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header .arrow {
    padding-right: 1rem;
  }

  .delete-btn {
    background: transparent;
    border: none;
    color: #d32f2f;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    padding-right: 1rem;
  }
</style>
