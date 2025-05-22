<template>
  <nav class="bottom-nav">
    <button class="nav-button" @click="() => { console.log('ministry'); $emit('navigate', 'ministry') }">
      <BookIcon class="icon" />

    </button>
    <button class="nav-button" @click="() => { console.log('study'); $emit('navigate', 'study') }">
      <MenuBookIcon class="icon" />
    </button>
    <button class="nav-button" @click="() => { console.log('goals'); $emit('navigate', 'goals') }">
      <TrophyAwardIcon class="icon" />
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
    height: 3rem;
    background-color: #054f4fff;
    display: flex;
    justify-content: space-around;
    padding: 0px 0;
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
    padding: 12px;
    min-width: 80px;
    flex: 1;
  }

  .nav-button .icon {
    font-size: 20px;
    margin-bottom: -4px;

  }

  .nav-button:hover {
    opacity: 0.8;
  }

  .nav-button:active {
    transform: scale(0.97);
  }
</style>
