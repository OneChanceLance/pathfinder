<template>
  <div class="research-topics">
    <button class="close-button" @click="$emit('close')">✕</button>
    <h1>Research Topics</h1>

    <div class="new-topic">
      <input v-model="newTopic" placeholder="Enter new topic" @keyup.enter="addTopic" />
      <button @click="addTopic">Add Topic</button>
    </div>

    <ul class="topic-list">
      <li v-for="(topic, index) in topics" :key="index">{{ topic }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  defineEmits(['close']);
  import { ref, onMounted } from 'vue';

  const topics = ref<string[]>([]);
  const newTopic = ref('');

  function loadTopics() {
    const stored = localStorage.getItem('researchTopics');
    if (stored) topics.value = JSON.parse(stored);
  }

  function saveTopics() {
    localStorage.setItem('researchTopics', JSON.stringify(topics.value));
  }

  function addTopic() {
    if (!newTopic.value.trim()) return;
    topics.value.push(newTopic.value.trim());
    newTopic.value = '';
    saveTopics();
  }

  onMounted(loadTopics);
</script>

<style scoped>
  .research-topics {
    padding: 20px;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 12px;
    right: 16px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  .new-topic {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .new-topic input {
    flex: 1;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .new-topic button {
    padding: 8px 12px;
    border-radius: 6px;
    background-color: #2e5aac;
    color: white;
    border: none;
    cursor: pointer;
  }

  .topic-list {
    list-style: none;
    padding: 0;
  }

  .topic-list li {
    background: #f4f4f4;
    padding: 10px;
    margin-bottom: 8px;
    border-radius: 6px;
    color: #666;
  }
</style>
