<template>
  <OverlayCard title="Research Topics">
    <div class="new-topic">
      <input v-model="newTopic" placeholder="Enter new topic" @keyup.enter="addTopic" />
      <button @click="addTopic">Add Topic</button>
    </div>
    <ul class="topic-list">
      <ResearchCard v-for="(topic, index) in filteredTopics" :key="index" :title="topic" @request-delete="deleteTopic"
        @open="openTopic" />
    </ul>

    <transition name="slide-overlay">
      <div v-if="showOverlay" class="overlay">
        <div class="overlay-content">
          <button class="close-button" @click="closeOverlay">✕</button>
          <h2>{{ activeTopic }}</h2>
          <p>This is where content for "{{ activeTopic }}" will go.</p>
        </div>
      </div>
    </transition>
  </OverlayCard>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import OverlayCard from '@/components/OverlayCard.vue';
  import ResearchCard from '@/components/Research/ResearchCard.vue';

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

  .search-bar input {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(20px);
    border-radius: 8px;
    width: 100%;
    padding: 8px;
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


  ul {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
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
