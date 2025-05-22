<template>
  <div class="reading-schedule">
    <button class="close-button" @click="$emit('close')">✕</button>
    <h1>Bible Reading Schedule</h1>
    <div class="calendar">
      <div class="day" v-for="(day, index) in days" :key="index">
        <label>
          <input type="checkbox" v-model="day.checked" @change="saveToStorage" />
          {{ day.date }} — {{ day.reading }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  defineEmits(['close']);

  interface ReadingDay {
    date: string;
    reading: string;
    checked: boolean;
  }

  const days = ref<ReadingDay[]>([]);

  const sampleReadings = [
    'Genesis 1-2', 'Genesis 3-5', 'Genesis 6-9', 'Genesis 10-11', 'Genesis 12-15',
    'Genesis 16-18', 'Genesis 19-21'
  ];

  onMounted(() => {
    const stored = localStorage.getItem('readingSchedule');
    if (stored) {
      days.value = JSON.parse(stored);
    } else {
      const today = new Date();
      const readingCount = sampleReadings.length;

      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toDateString();
        const reading = sampleReadings[i % readingCount];
        days.value.push({ date: dateStr, reading, checked: false });
      }

      saveToStorage();
    }
  });

  function saveToStorage() {
    localStorage.setItem('readingSchedule', JSON.stringify(days.value));
  }
</script>

<style scoped>
  .reading-schedule {
    position: relative;
    padding: 20px;
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

  .calendar {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .day {
    background: #f9f9f9;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
</style>
