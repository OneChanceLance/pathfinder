<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import { ref, onMounted } from 'vue'

  import LoadingScreen from './components/LoadingScreen.vue'
  import MinistryGuide from './pages/ministryGuide.vue'
  import GoalsBalance from './pages/GoalsBalance.vue'
  import StudyDashboard from './pages/studyDashboard.vue'

  const loading = ref(true)
  const isPWA = ref(false)

  const activeTab = ref('')
  const showMinistry = ref(false)
  const showGoals = ref(false)
  const showStudy = ref(false)

  function handleNavigate(tab: string) {
    console.log(`Selected tab: ${tab}`)
    activeTab.value = tab
    showMinistry.value = tab === 'ministry'
    showGoals.value = tab === 'goals'
    showStudy.value = tab === 'study'
  }

  onMounted(() => {
    setTimeout(() => {
      loading.value = false
    }, 1500) // simulate loading delay

    // Detect PWA mode or small screen for testing
    isPWA.value =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true || 3
    window.innerWidth <= 500;
  })
</script>

<template>
  <LoadingScreen v-if="loading" />
  <div v-else class="pwa-wrapper">
    <MinistryGuide v-if="showMinistry" />
    <StudyDashboard v-if="showStudy" />
    <GoalsBalance v-if="showGoals" />
    <NavBar class="navbar" :activeTab="activeTab" @navigate="handleNavigate" />
  </div>
</template>

<style scoped>
  header {
    line-height: 1.5;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;

    }

    .logo {
      margin: 0 2rem 0 0;
    }


  }

  .navbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
  }

  .pwa-wrapper {
    display: block;
    min-height: 100dvh;
    padding-bottom: 60px;
    /* prevent content overlap with navbar */
  }

  @media (min-width: 768px) {
    .mobile-only {
      display: none;
    }
  }
</style>
