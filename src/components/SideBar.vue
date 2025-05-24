<template>
  <div class="sidebar">
    <h2>Research Topics</h2>
    <ul>
      <li v-for="(subject, index) in subjects" :key="index" :class="{ active: selectedSubject === subject }"
        @click="selectSubject(subject)">
        {{ subject }}
      </li>
    </ul>
    <button v-if="selectedSubject" @click="openResearch">Open "{{ selectedSubject }}" Research</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const subjects = ref(['Astronomy', 'Biology', 'History', 'Philosophy', 'Technology'])
  const selectedSubject = ref(null)

  function selectSubject(subject) {
    selectedSubject.value = subject
  }

  function openResearch() {
    alert(`Opening research for "${selectedSubject.value}"`)
    // You can emit an event or use a router push to navigate to the research page here
  }
</script>

<style scoped>
  .sidebar {
    width: 100%;
    padding: 20px 20px 20px 0;
    background-color: #f4f4f4;
    border-right: 1px solid #ddd;
    height: 100vh;
    box-sizing: border-box;
  }

  .sidebar h2 {
    margin-bottom: 15px;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar li {
    padding: 10px;
    border-right: 1px solid #ddd;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .sidebar li:hover,
  .sidebar li.active {
    background-color: #ddd;
  }

  button {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    cursor: pointer;
  }
</style>
