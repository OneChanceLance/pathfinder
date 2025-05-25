<template>
  <div class="research-topics-wrapper">
    <div class="research-topics">
      <button class="close-button" @click="$emit('close')">✕</button>
      <h1>Research Topics</h1>

      <div class="search-bar">
        <input v-model="searchQuery" placeholder="Search topics..." />
      </div>

      <div class="new-topic">
        <input v-model="newTopic" placeholder="Enter new topic" @keyup.enter="addTopic" />
        <button @click="addTopic">Add Topic</button>
      </div>

      <ul class="topic-list">
        <ResearchTopicCard v-for="(topic, index) in filteredTopics" :key="index" :title="topic"
          @request-delete="deleteTopic" @open="openTopic" />
      </ul>
    </div>

    <transition name="slide-overlay">
      <div v-if="showOverlay" class="overlay">
        <div class="overlay-content">
          <button class="close-button" @click="closeOverlay">✕</button>
          <h2>{{ activeTopic }}</h2>
          <p>This is where content for "{{ activeTopic }}" will go.</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  defineEmits(['close']);
  import { ref, onMounted, computed } from 'vue'
  import ResearchTopicCard from '@/components/ResearchTopicCard.vue';

  const topics = ref<string[]>([]);
  const newTopic = ref('');

  const searchQuery = ref('');
  const filteredTopics = computed(() =>
    topics.value.filter(topic =>
      topic.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  const activeTopic = ref<string | null>(null)
  const showOverlay = ref(false)

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

  function openTopic(title: string) {
    activeTopic.value = title
    showOverlay.value = true
  }

  function closeOverlay() {
    showOverlay.value = false
    activeTopic.value = null
  }

  function deleteTopic(title: string) {
    const index = topics.value.findIndex(t => t === title)
    if (index !== -1) {
      topics.value.splice(index, 1)
      localStorage.setItem('researchTopics', JSON.stringify(topics.value))
    }
  }

  onMounted(loadTopics);
</script>

<style scoped>
  .research-topics-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
    z-index: 999;
    overflow: auto;
  }

  .research-topics {
    min-height: 100%;

    box-sizing: border-box;
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

  .search-bar {
    margin-bottom: 12px;
  }

  .search-bar input {
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
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

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .overlay-content {
    background: white;
    padding: 24px;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    position: relative;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  }

  .overlay-content .close-button {
    position: absolute;
    top: 8px;
    right: 12px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }

  .slide-overlay-enter-active,
  .slide-overlay-leave-active {
    transition: all 0.3s ease;
  }

  .slide-overlay-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-overlay-enter-to {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-overlay-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-overlay-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
</style>
