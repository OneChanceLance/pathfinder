<template>
  <div class="goals-page">
    <h1>Spiritual Goals & Balance</h1>

    <section class="add-goal">
      <h2>Add New Goal</h2>
      <form @submit.prevent="addGoal">
        <input v-model="newGoal.title" placeholder="Goal Title" required />
        <input v-model="newGoal.due" type="date" required />
        <input v-model.number="newGoal.progress" type="number" min="0" max="100" placeholder="Progress %" />
        <button type="submit">Add Goal</button>
      </form>
    </section>

    <section class="goal-list" v-if="goals.length">
      <h2>Your Goals</h2>
      <div class="goal-card" v-for="goal in goals" :key="goal.id">
        <div class="goal-header">
          <h3>{{ goal.title }}</h3>
          <button @click="removeGoal(goal.id)">×</button>
        </div>
        <p>Due: {{ goal.due }}</p>
        <progress :value="goal.progress" max="100"></progress>
        <input v-model.number="goal.progress" type="range" min="0" max="100" @input="saveGoals" />
      </div>
    </section>

    <section v-else class="no-goals">
      <p>No goals yet. Add one above!</p>
    </section>

    <section class="daily-journal">
      <h2>Daily Journal</h2>
      <textarea v-model="journal" placeholder="Write a note..."></textarea>
      <button @click="saveJournal">Save Entry</button>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  interface Goal {
    id: number
    title: string
    due: string
    progress: number
  }

  const goals = ref<Goal[]>([])
  const journal = ref(localStorage.getItem('dailyJournal') || '')
  const newGoal = ref({ title: '', due: '', progress: 0 })

  function loadGoals() {
    const saved = localStorage.getItem('goals')
    if (saved) goals.value = JSON.parse(saved)
  }

  function saveGoals() {
    localStorage.setItem('goals', JSON.stringify(goals.value))
  }

  function addGoal() {
    goals.value.push({ id: Date.now(), ...newGoal.value })
    saveGoals()
    newGoal.value = { title: '', due: '', progress: 0 }
  }

  function removeGoal(id: number) {
    goals.value = goals.value.filter(g => g.id !== id)
    saveGoals()
  }

  function saveJournal() {
    localStorage.setItem('dailyJournal', journal.value)
    alert('Journal saved!')
  }

  onMounted(loadGoals)
</script>

<style scoped>
  .goals-page {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .add-goal form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  input[type="text"],
  input[type="date"],
  input[type="number"],
  textarea {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  button {
    background-color: #054f4f;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .goal-card {
    background: #f2f2f2;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    position: relative;
  }

  .goal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .goal-header button {
    background: transparent;
    color: #333;
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
  }

  progress {
    width: 100%;
    height: 1rem;
    margin-top: 0.5rem;
  }

  textarea {
    width: 100%;
    height: 100px;
    margin-top: 0.5rem;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .no-goals {
    text-align: center;
    margin: 2rem 0;
  }
</style>
