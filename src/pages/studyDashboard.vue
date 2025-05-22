<template>
  <div class="study-dashboard">
    <h1>Study Dashboard</h1>
    <div class="menu">
      <button class="card-button" @click="goTo('reading')">
        <div class="titleContainer">
          <Book class="icon" />
          <span class="text">Bible Reading Schedule</span> <span class="arrow">›</span>
        </div>
        <div class="imgBanner">
          <img src="./../assets/bible.png" class="banner">
        </div>
      </button>
      <button class="card-button" @click="goTo('research')">
        <div class="titleContainer">
          <AccountGroupIcon class="icon" />
          <span class="text">Research Topics </span> <span class="arrow">›</span>
        </div>
        <div class="imgBanner">
          <img src="./../assets/research.png" class="banner">
        </div>
      </button>
      <button class="card-button" @click="goTo('notes')">
        <div class="titleContainer">
          <NoteIcon class="icon" />
          <span class="text">Notes </span> <span class="arrow">›</span>
        </div>
        <div class="imgBanner">
          <img src="./../assets/notes.png" class="banner">
        </div>
      </button>
    </div>
    <transition name="slide">
      <ReadingSchedule v-if="showReadingSchedule" class="overlay" @close="showReadingSchedule = false" />
    </transition>
    <transition name="slide">
      <ResearchTopics v-if="showResearchTopics" class="overlay" @close="showResearchTopics = false" />
    </transition>
    <transition name="slide">
      <Notes v-if="showNotes" class="overlay" @close="showNotes = false" />
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Book from 'vue-material-design-icons/BookMultiple.vue';
  import AccountGroupIcon from 'vue-material-design-icons/Magnify.vue';
  import NoteIcon from 'vue-material-design-icons/Note.vue';
  import ReadingSchedule from './ReadingSchedule.vue';
  import ResearchTopics from './ResearchTopics.vue';
  import Notes from './Notes.vue';

  const showReadingSchedule = ref(false);
  const showResearchTopics = ref(false);
  const showNotes = ref(false);

  function goTo(section: string) {
    if (section === 'reading') {
      showReadingSchedule.value = true;
    } else if (section === 'research') {
      showResearchTopics.value = true;
    } else if (section === 'notes') {
      showNotes.value = true;
    }
  }
</script>

<style scoped>
  .study-dashboard {
    top: 0;
    left: 0;
    height: 100dvh;
    width: 100%;
    background: white;
    overflow-y: auto;
    padding: 20px;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }


  .card-button {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #1a1a1a;
    cursor: pointer;
    transition: background-color 0.2s ease;

    display: flex;
    flex-direction: column;

    flex: 1;
    overflow: hidden;
  }

  .card-button:hover {
    background-color: #f0f0f0;
  }

  .card-button .icon {
    font-size: 20px;
    color: #054f4fff;
  }

  .card-button .arrow {
    font-size: 18px;
    color: #999;
  }

  .card-button .text {
    flex: 1;
    text-align: left;
  }

  .titleContainer {
    display: flex;
    font-size: 16px;
    padding: 14px 16px;
    font-weight: 500;
    color: #1a1a1a;
    cursor: pointer;
    transition: background-color 0.2s ease;
    width: 100%;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
  }

  .titleContainer span {
    display: flex;
    align-items: center;

  }

  button {
    padding: 0;
  }

  .imgBanner {
    width: 100%;

  }

  .imgBanner img {
    display: block;
    width: 100%;
    height: 190px;
    object-fit: cover;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background: white;
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
