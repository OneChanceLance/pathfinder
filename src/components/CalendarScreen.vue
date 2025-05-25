<script setup lang="ts">
  import { ref, computed, watch } from 'vue'

  const props = defineProps({
    year: Number,
    month: Number,
    dailyHours: {
      type: Array,
      required: true
    }
  })

  const firstDayOfWeek = computed(() => {
    return new Date(props.year, props.month, 1).getDay()
  })

  const daysInMonth = computed(() => {
    return new Date(props.year, props.month + 1, 0).getDate()
  })

  const weeks = computed(() => {
    const result = []
    let week = []
    const totalDays = daysInMonth.value
    const dayCounter = 0

    for (let i = 0; i < firstDayOfWeek.value; i++) {
      week.push(null)
    }

    for (let day = 0; day < totalDays; day++) {
      week.push(day)
      if (week.length === 7) {
        result.push(week)
        week = []
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null)
      }
      result.push(week)
    }

    return result
  })

  const selectedDay = ref<number | null>(null)
  const newHour = ref<number | null>(null)
  const showModal = ref(false)

  const openModal = (day: number) => {
    selectedDay.value = day
    newHour.value = props.dailyHours[day]
    showModal.value = true
  }

  const updateHour = () => {
    if (selectedDay.value !== null && newHour.value !== null) {
      props.dailyHours[selectedDay.value] = newHour.value
    }
    showModal.value = false
  }
</script>

<template>
  <div class="calendar-grid">
    <div class="week-row" v-for="(week, weekIndex) in weeks" :key="weekIndex">
      <div class="day-input" v-for="(day, i) in week" :key="i" :class="{ empty: day === null }"
        @click="day !== null && openModal(day)">
        <label v-if="day !== null">{{ day + 1 }}</label>
        <div v-if="day !== null">
          <span :class="{ 'hour-highlight': dailyHours[day] }"
            v-if="dailyHours[day] !== null && dailyHours[day] !== undefined && dailyHours[day] !== ''">
            {{ dailyHours[day] ? dailyHours[day] : '\u00A0' }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h3>Edit Hours</h3>
      <select v-model.number="newHour">
        <option v-for="value in Array.from({ length: 25 }, (_, i) => i * 0.5)" :key="value" :value="value">
          {{ value }} hours
        </option>
      </select>
      <button @click="updateHour">Save</button>
    </div>
  </div>
</template>

<style scoped>
  .calendar-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .week-row {
    display: flex;
    justify-content: space-between;
    gap: 0.4rem;
  }

  .day-input {
    flex: 1;
    padding: 0.3rem;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .day-input label {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
    color: #2e7d32;
  }

  .day-input input {
    background: #f1f8f4;
    border-radius: 50%;
    text-align: center;
    font-size: 0.95rem;
    font-weight: bold;
    color: #2e7d32;
    width: 30px;
    height: 30px;
    padding: 0.15rem 0;
    pointer-events: none;
  }

  .hour-circle {
    width: 30px;
    height: 30px;
    background: #f1f8f4;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    font-weight: bold;
    color: #2e7d32;
    cursor: pointer;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background: linear-gradient(145deg, #ffffff, #f0f8f5);
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 280px;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .modal-content h3 {
    margin: 0;
    color: #2e7d32;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .modal-content select {
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #c8e6c9;
    background-color: #ffffff;
    font-size: 1rem;
    width: 100%;
  }

  .modal-content button {
    padding: 0.5rem 1rem;
    background-color: #66bb6a;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .modal-content button:hover {
    background-color: #4caf50;
  }

  .hour-highlight {
    background-color: #d0f0dc;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
  }



</style>
