<template>
  <div class="page-container">
    <div class="card">
      <h1>Study Dashboard</h1>
      <div class="menu-grid">
        <StudyCard title="Bible Reading Schedule" variant="Bible" @click="goTo('reading')" />
        <StudyCard title="Research Topics" variant="Research" @click="goTo('research')" />
        <StudyCard title="Notes" variant="Notes" @click="goTo('notes')" />
      </div>
      <transition name="slide">
        <div v-if="showReadingSchedule || showResearchTopics || showNotes">
          <ReadingSchedule v-if="showReadingSchedule" class="overlay" @close="showReadingSchedule = false" />
          <ResearchTopics v-else-if="showResearchTopics" class="overlay" @close="showResearchTopics = false" />
          <Notes v-else-if="showNotes" class="overlay" @close="showNotes = false" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import StudyCard from '@/components/StudyCard.vue';
  import ReadingSchedule from './ReadingSchedule.vue';
  import ResearchTopics from './ResearchTopics.vue';
  import Notes from './Notes.vue';

  const showReadingSchedule = ref(false);
  const showResearchTopics = ref(false);
  const showNotes = ref(false);

  function goTo(section: string) {
    showReadingSchedule.value = false
    showResearchTopics.value = false
    showNotes.value = false

    if (section === 'reading') {
      showReadingSchedule.value = true
    } else if (section === 'research') {
      showResearchTopics.value = true
    } else if (section === 'notes') {
      showNotes.value = true
    }
  }
</script>

<style scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 20px;
    min-height: 100vh;
    background: linear-gradient(135deg, #b2feec 0%, #0ed2f7 100%);
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

  .card-button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 16px;
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: background 0.2s;
  }

  .card-button:hover {
    background: rgba(255, 255, 255, 0.35);
  }

  .titleContainer {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-button .icon {
    width: 24px;
    height: 24px;
    color: #054f4fff;
    flex-shrink: 0;
  }

  .card-button .text {
    flex: 1;
    font-size: 16px;
    color: #0a2533;
    text-align: left;
  }

  .card-button .arrow {
    font-size: 18px;
    color: #0a2533;
    flex-shrink: 0;
  }

  .imgBanner {
    margin-top: 12px;
    width: 100%;
  }

  .imgBanner img {
    display: block;
    width: 100%;
    height: 190px;
    object-fit: cover;
    border-radius: 12px;

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

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
</style>
