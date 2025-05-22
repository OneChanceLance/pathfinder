<template>
  <div class="call-list-page">
    <button class="close-button" @click="$emit('close')">✕</button>
    <h1>Call List</h1>
    <button class="toggle-form-button" @click="showForm = !showForm">
      {{ showForm ? 'Cancel' : 'Create Call' }}
    </button>
    <div class="new-call-form" v-if="showForm">
      <input v-model="newCall.name" placeholder="Name" />
      <input v-model="newCall.address" placeholder="Address" />
      <input v-model="newCall.lastVisited" placeholder="Last Visited" />
      <button @click="addCall">Add Call</button>
    </div>
    <div class="call-list">
      <div class="call-card" v-for="call in calls" :key="call.id">
        <h2>{{ call.name }}</h2>
        <p>{{ call.address }}</p>
        <p class="last-visited">Last Visited: {{ call.lastVisited }}</p>
        <button class="delete-button" @click="deleteCall(call.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const emit = defineEmits(['close']);

  const calls = ref(
    JSON.parse(localStorage.getItem('calls') || '[]')
  );
  defineProps<{ activeTab: string }>();

  const newCall = reactive({
    name: '',
    address: '',
    lastVisited: ''
  });

  const showForm = ref(false);

  function addCall() {
    if (!newCall.name || !newCall.address || !newCall.lastVisited) return;

    const newEntry = {
      id: Date.now(),
      name: newCall.name,
      address: newCall.address,
      lastVisited: newCall.lastVisited
    };

    calls.value.push(newEntry);
    localStorage.setItem('calls', JSON.stringify(calls.value));

    newCall.name = '';
    newCall.address = '';
    newCall.lastVisited = '';
  }
  function deleteCall(id: number) {
    const confirmDelete = window.confirm('Are you sure you want to delete this call?');
    if (!confirmDelete) return;

    calls.value = calls.value.filter(call => call.id !== id);
    localStorage.setItem('calls', JSON.stringify(calls.value));
  }
</script>

<style scoped>
  .call-list-page {
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

  .toggle-form-button {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .new-call-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }

  .new-call-form input {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .new-call-form button {
    padding: 10px;
    border-radius: 6px;
    background-color: #2e5aac;
    color: white;
    border: none;
    cursor: pointer;
  }

  .call-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 70vh;
    overflow-y: auto;
  }

  .call-card {
    background-color: #f4f4f4;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  .call-card h2 {
    margin: 0 0 8px 0;
    font-size: 18px;
  }

  .last-visited {
    font-size: 12px;
    color: #666;
  }

  .delete-button {
    margin-top: 10px;
    padding: 6px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }
</style>
