<template>
  <div class="page-container">
    <div v-if="!activePage" class="card">
      <h1>Study Dashboard</h1>
      <transition name="slide">
        <div v-if="!activePage" class="menu-grid">
          <StudyCard title="Bible Reading Schedule" variant="Bible" @click="openPage('reading')" />
          <StudyCard title="Research Topics" variant="Research" @click="openPage('research')" />
          <StudyCard title="Notes" variant="Notes" @click="openPage('notes')" />
        </div>
      </transition>
    </div>
    <transition name="slide">
      <ReadingSchedule v-if="activePage === 'reading'" class="overlay" @close="closePage" />
    </transition>
    <transition name="slide">
      <ResearchTopics v-if="activePage === 'research'" class="overlay" @close="closePage" />
    </transition>
    <transition name="slide">
      <Notes v-if="activePage === 'notes'" class="overlay" @close="closePage" />
    </transition>

  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import StudyCard from '@/components/StudyCard.vue';
  import ReadingSchedule from './ReadingSchedule.vue';
  import ResearchTopics from './ResearchTopics.vue';
  import Notes from './NotesPage.vue';


  const activePage = ref<string | null>(null);
  function openPage(page: string) {
    activePage.value = page;
  }

  function closePage() {
    activePage.value = null;
  }
</script>

<style scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 20px;
    min-height: 100vh;

  }

  .card {
    width: 400px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    padding: 24px;
    box-sizing: border-box;
  }

  .card h1 {
    margin: 0;
    font-size: 24px;
    color: #0a2533;
    text-align: center;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    z-index: 1000;
    overflow-y: auto;
    padding: 20px;
  }

  /* slide transition */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }

  .slide-enter-to,
  .slide-leave-from {
    transform: translateX(0);
  }
</style>
