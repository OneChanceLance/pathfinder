<template>
  <div class="page-container">
    <div v-if="!activePage" class="card">
      <div class="card-header">
        <h1>Ministry Guide</h1>
      </div>

      <transition name="slide">
        <div v-if="!activePage" class="menu-grid">
          <MinistryCard title="Hours" @click="openPage('hours')">
            <MinistryStat title="This Month" :data=totalHours />
            <MinistryStat title="Service Year" :data=totalHours />
          </MinistryCard>
          <MinistryCard title="Calls" @click="openPage('calls')">
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
          </MinistryCard>
          <MinistryCard title="Scriptures" @click="openPage('scripture')">
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
          </MinistryCard>
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
    <transition name="slide">
      <TerritoriesPage v-if="activePage === 'territories'" class="overlay" @close="closePage" />
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  import MinistryCard from '@/components/Ministry/MinistryCard.vue';
  import MinistryStat from '@/components/Ministry/MinistryStat.vue';

  import CallList from './CallList.vue';
  import ScriptureLauncher from './ScriptureLauncher.vue';
  import HoursPage from './HoursPage.vue';
  import TerritoriesPage from './TerritoriesPage.vue';


  const activePage = ref<string | null>(null);
  function openPage(page: string) {
    activePage.value = page;
  }

  function closePage() {
    activePage.value = null;
  }

  const dailyHours = ref<Record<string, number>>({})

  const today = new Date()
  const currentMonth = ref(today.getMonth())
  const currentYear = ref(today.getFullYear())

  // generate weeks of the calendar

  const totalHours = computed(() => {
    return Object.entries(dailyHours.value)
      .filter(([date]) => {
        const [y, m] = date.split('-').map(Number)
        return y === currentYear.value && m === currentMonth.value + 1
      })
      .reduce((sum, [, hrs]) => sum + hrs, 0)
  })
</script>

<style scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px 20px;
    height: auto;
    overflow: hidden;
  }

  .card {

    flex: 1;
    width: 360px;
    background: rgba(255, 255, 255, 0.15);

    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    padding: 24px;
    box-sizing: border-box;
  }

  .card-header h1 {
    align-items: flex-start;
    flex: 1;
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
