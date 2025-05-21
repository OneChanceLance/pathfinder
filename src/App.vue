<script setup lang="ts">
  import NavBar from './components/NavBar.vue'
  import { ref, onMounted } from 'vue'

  import LoadingScreen from './components/LoadingScreen.vue'

  const loading = ref(true)
  const isPWA = ref(false)

  onMounted(() => {
    setTimeout(() => {
      loading.value = false
    }, 1500) // simulate loading delay

    // Detect PWA mode
    isPWA.value =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
  })
</script>

<template v-if="loading">
  <LoadingScreen />
</template>
<template v-else>
  <div v-if="isPWA" class="mobile-only">
    <NavBar class="navbar" />
  </div>
  <div v-else class="desktop-layout">
    <!-- Desktop layout content goes here -->
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

  .mobile-only {
    display: block;
  }

  @media (min-width: 768px) {
    .mobile-only {
      display: none;
    }
  }
</style>
