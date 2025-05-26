<template>
  <div class="page-container" @click.self="$emit('close')">
    <div class="card">
      <div class="card-header">
        <BackButton @click="$emit('close')" />
      </div>
      <div class=" card-title">
        <div class="title-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <h1>{{ title }}</h1>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BackButton from './BackButton.vue';

  defineProps({
    title: String
  })

</script>

<style scoped>
  .page-container {
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #b2feec 0%, #0ed2f7 100%);
  }

  .card {
    padding: 24px;
    height: auto;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
    color: #0a2533;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


  .card-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .title-icon {
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title-icon svg {
    width: 20px;
    height: 20px;
  }
</style>
