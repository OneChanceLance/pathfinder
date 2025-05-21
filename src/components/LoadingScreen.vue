<script setup lang="ts">

</script>

<template>
  <div class="loading-screen">
    <div class="compass-container">
      <div class="compass"></div>
    </div>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .compass-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .compass {
    width: 60px;
    height: 60px;
    border: 6px solid #ccc;
    border-top: 6px solid #007BFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  p {
    margin-top: 20px;
    font-size: 1.5rem;
    color: #333;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
