<template>
  <div class="page-container">
    <div v-if="!activePage" class="card">
      <div class="card-header">
        <h1>Ministry Guide</h1>
      </div>

      <transition name="slide">
        <div class="menu-grid">
          <button class="menu-card" @click="openPage('hours')">
            <ClockOutline class="icon" />
            <span> Hours</span>
            <svg class="arrow" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <button class="menu-card" @click="openPage('calls')">
            <DirectionsIcon class="icon" />
            <span>Calls</span>
            <svg class="arrow" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <button class="menu-card" @click="openPage('scripture')">
            <FlashIcon class="icon" />
            <span>Scripture Topics</span>
            <svg class="arrow" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <button class="menu-card" @click="openPage('territories')">
            <MapIcon class="icon" />
            <span>Territory Map</span>
            <svg class="arrow" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </transition>
    </div>

    <transition name="slide">
      <CallList v-if="activePage === 'calls'" class="overlay" @close="closePage" />
    </transition>
    <transition name="slide">
      <ScriptureLauncher v-if="activePage === 'scripture'" class="overlay" @close="closePage" />
    </transition>
    <transition name="slide">
      <HoursPage v-if="activePage === 'hours'" class="overlay" @close="closePage" />
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import DirectionsIcon from 'vue-material-design-icons/SignDirection.vue';
  import FlashIcon from 'vue-material-design-icons/Flash.vue';
  import MapIcon from 'vue-material-design-icons/Map.vue';
  import ClockOutline from 'vue-material-design-icons/ClockOutline.vue';
  import { ref } from 'vue';
  import CallList from './CallList.vue';
  import ScriptureLauncher from './ScriptureLauncher.vue';
  import HoursPage from './HoursPage.vue';

  const router = useRouter();

  function goTo(section: string) {
    router.push({ name: section });
  }

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
    padding: 40px 20px;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(135deg, #b2feec 0%, #0ed2f7 100%);
  }

  .card {
    width: 360px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    padding: 24px;
    box-sizing: border-box;
  }

  .card-header h1 {
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

  .menu-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: background 0.2s;
  }

  .menu-card:hover {
    background: rgba(255, 255, 255, 0.35);
  }

  .menu-card .icon {
    width: 24px;
    height: 24px;
    color: #054f4fff;
    flex-shrink: 0;
  }

  .menu-card span {
    flex: 1;
    margin: 0 12px;
    font-size: 16px;
    color: #0a2533;
    text-align: left;
  }

  .menu-card .arrow {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    color: #0a2533;
  }


  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
    padding: 20px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
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
