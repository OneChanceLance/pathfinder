<template>
  <nav class="bottom-nav">
    <button class="nav-button" @click="$emit('navigate', 'ministry')">
      <BookIcon class="icon" />
      <span v-if="activeTab === 'ministry'" class="label">Ministry Tools</span>
    </button>
    <button class="nav-button" @click="$emit('navigate', 'study')">
      <MenuBookIcon class="icon" />
      <span v-if="activeTab === 'study'" class="label">Study Dashboard</span>
    </button>
    <button class="nav-button" @click="$emit('navigate', 'goals')">
      <TrophyAwardIcon class="icon" />
      <span v-if="activeTab === 'goals'" class="label">Goals & Balance</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
  import BookIcon from 'vue-material-design-icons/Book.vue';
  import MenuBookIcon from 'vue-material-design-icons/BookOpenVariant.vue';
  import TrophyAwardIcon from 'vue-material-design-icons/TrophyAward.vue';
  defineProps<{ activeTab: string }>();
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
