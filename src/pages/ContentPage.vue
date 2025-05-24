<template>
  <div class="desktop-layout">
    <nav class="sidebar">
      <h2>Topics</h2>
      <ul>
        <li @click="selectedSubject = 'Astronomy'">Astronomy</li>
        <li @click="selectedSubject = 'Biology'">Biology</li>
        <li @click="selectedSubject = 'History'">History</li>
        <li @click="selectedSubject = 'Philosophy'">Philosophy</li>
        <li @click="selectedSubject = 'Technology'">Technology</li>
      </ul>
    </nav>
    <main class="content-page">
      <div v-if="selectedSubject" class="overlay">
        <h1>{{ selectedSubject }}</h1>
        <p>{{ contentMap[selectedSubject] }}</p>
        <button @click="selectedSubject = null">Close</button>
      </div>
      <div v-else class="blank">
        <p>Select a topic from the sidebar to begin your research.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const selectedSubject = ref(null)

  const contentMap = {
    Astronomy: 'Astronomy is the scientific study of celestial bodies such as stars, planets, and galaxies.',
    Biology: 'Biology is the study of living organisms, including their structure, function, growth, and evolution.',
    History: 'History is the study of past events, particularly in human affairs.',
    Philosophy: 'Philosophy involves the study of fundamental questions about existence, knowledge, values, and reason.',
    Technology: 'Technology refers to the application of scientific knowledge for practical purposes, especially in industry.'
  }
</script>

<style scoped>
  .desktop-layout {
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: white;
  }

  .content-page {
    flex: 1;
    padding: 30px;
    overflow-y: auto;
  }

  .sidebar {
    width: 240px;
    padding: 20px;
    background-color: #f4f4f4;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
  }

  .sidebar h2 {
    margin-bottom: 10px;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;


  }

  .sidebar li {
    margin-bottom: 10px;
    padding: 8px 10px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
  }

  .overlay {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .blank {
    color: #666;
    font-style: italic;
    margin-top: 40px;
  }
</style>
