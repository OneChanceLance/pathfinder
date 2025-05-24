<template>
  <div class="ministry-page">
    <h1>Ministry Guide</h1>
    <div class="menu">
      <button class="card-button" @click="goTo('hours')">
        <ClockOutline class="icon" />
        <span class="text">Hours</span>
        <span class="arrow">›</span>
      </button>
      <button class="card-button" @click="showCallList = true">
        <DirectionsIcon class="icon" />
        <span class="text">Calls</span>
        <span class="arrow">›</span>
      </button>
      <button class="card-button" @click="showScriptureLauncher = true">
        <FlashIcon class="icon" />
        <span class="text">Scripture Topics</span>
        <span class="arrow">›</span>
      </button>
      <button class="card-button" @click="goTo('territories')">
        <MapIcon class="icon" />
        <span class="text">Territory Map</span>
        <span class="arrow">›</span>
      </button>
    </div>
    <transition name="slide">
      <CallList v-if="showCallList" class="overlay" @close="showCallList = false" />
    </transition>
    <transition name="slide">
      <ScriptureLauncher v-if="showScriptureLauncher" class="overlay" @close="showScriptureLauncher = false" />
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import DirectionsIcon from 'vue-material-design-icons/SignDirection.vue';
  import FlashIcon from 'vue-material-design-icons/Flash.vue';
  import MapIcon from 'vue-material-design-icons/Map.vue';
  import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue';
  import ClockOutline from 'vue-material-design-icons/ClockOutline.vue';
  import { ref } from 'vue';
  import CallList from './CallList.vue';
  import ScriptureLauncher from './ScriptureLauncher.vue';

  const router = useRouter();

  function goTo(section: string) {
    router.push({ name: section });
  }

  const showCallList = ref(false);
  const showScriptureLauncher = ref(false);
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

  .menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }


  .card-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #1a1a1a;
    cursor: pointer;
    transition: background-color 0.2s ease;
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

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }

  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100dvh;
    background: white;
    z-index: 999;
    padding: 20px;
    overflow-y: auto;
  }
</style>
