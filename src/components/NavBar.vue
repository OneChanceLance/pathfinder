<template>
  <nav class="bottom-nav">
    <button class="nav-button" @click="$emit('navigate', 'ministry')">
      <span class="icon">📖</span>
      <span class="label">Ministry Tools</span>
    </button>
    <button class="nav-button" @click="$emit('navigate', 'study')">
      <span class="icon">📚</span>
      <span class="label">Study Dashboard</span>
    </button>
    <button class="nav-button" @click="$emit('navigate', 'goals')">
      <span class="icon">🎯</span>
      <span class="label">Goals & Balance</span>
    </button>
  </nav>
</template>

<script lang="ts" setup>
  // This component emits a "navigate" event with the section name
</script>

<style scoped>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #0d1b2a;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    border-top: 1px solid #333;
  }

  .nav-button {
    background: none;
    border: none;
    color: #fff;
    font-family: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
  }

  .nav-button .icon {
    font-size: 20px;
    margin-bottom: 4px;
  }
</style>
