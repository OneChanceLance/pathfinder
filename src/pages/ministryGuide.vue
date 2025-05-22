<template>
  <div class="ministry-page">
    <h1>Ministry Guide</h1>
    <div class="menu">
      <button @click="goTo('calls')" class="menu-button">📞 Calls & Return Visits</button>
      <button @click="goTo('territories')" class="menu-button">🗺️ Territories</button>
      <button @click="goTo('scripts')" class="menu-button">💬 Conversation Starters</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function goTo(section: string) {
    router.push({ name: section });
  }
</script>

<style scoped>
  .ministry-page {
    top: 0;
    left: 0;
    height: 100dvh;
    width: 100%;
    background: white;
    padding: 20px;
    overflow-y: auto;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }

  .menu-button {
    padding: 12px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    background-color: #2e5aac;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .menu-button:hover {
    background-color: #23488a;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
</style>
