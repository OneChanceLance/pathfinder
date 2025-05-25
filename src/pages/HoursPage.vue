<template>
  <div class="hours-page">

    <button class="back-button" @click="$emit('close')">Back</button>

    <div class="card goal">



      <label for="roleSelect">Role:</label>
      <select id="roleSelect" v-model="selectedRole">
        <option value="publisher">Publisher (No Requirement)</option>
        <option value="aux">Auxiliary Pioneer (30 hrs/month)</option>
        <option value="regular">Regular Pioneer (600 hrs/year)</option>
      </select>

      <label for="goalInput">Monthly Goal (hours):</label>
      <input id="goalInput" v-model.number="monthlyGoal" type="number" min="0"
        :readonly="selectedRole !== 'publisher'" />

      <div class="summary">
        <div class="summary-item">
          <div>Total Hours So Far:</div>
          <div><strong>{{ totalHours }}</strong></div>
        </div>
        <div class="summary-item">
          <div>Remaining:</div>
          <div>
            <strong>{{ remainingHours }}</strong>
            <div v-if="selectedRole === 'regular' && bankedHours > 0" class="surplus-label">
              {{ bankedHours }} surplus
            </div>
          </div>
        </div>
        <div class="summary-item">
          <div>YTD (Service Year):</div>
          <div><strong>{{ serviceYearHours }}</strong></div>
        </div>
      </div>

      <hr class="divider" />
      <div class="weekday-header">
        <div v-for="(day, i) in 7" :key="i" class="weekday">{{ getWeekdayName(i) }}</div>
      </div>
      <CalendarScreen :year="currentYear" :month="currentMonth" :dailyHours="dailyHours" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import CalendarScreen from '@/components/CalendarScreen.vue'

  // Role selector: publisher, aux, regular
  const selectedRole = ref<'publisher' | 'aux' | 'regular'>('publisher')
  const monthlyGoal = ref(0)

  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() // 0-indexed
  const currentDay = today.getDate()
  const currentDateString = today.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const currentMonthName = today.toLocaleDateString(undefined, { month: 'long' })

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const dailyHours = ref<number[]>(Array.from({ length: daysInMonth }, () => 0))

  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()

  // Watch for role changes and update monthlyGoal accordingly
  watch(selectedRole, () => {
    if (selectedRole.value === 'aux') {
      monthlyGoal.value = 30
    } else if (selectedRole.value === 'regular') {
      monthlyGoal.value = 50
    } else {
      monthlyGoal.value = 0
    }
  }, { immediate: true })

  const totalHours = computed(() =>
    dailyHours.value.reduce((sum, hours) => sum + hours, 0)
  )

  const remainingHours = computed(() =>
    Math.max(monthlyGoal.value - totalHours.value, 0)
  )

  // For Regular Pioneers, show banked hours (carry forward extra hours over 50)
  const bankedHours = computed(() => {
    if (selectedRole.value !== 'regular') return 0
    return Math.max(totalHours.value - 50, 0)
  })

  // NOTE: Full tracking across months will require storing historical month data, not just current month hours.
  const serviceYearHours = computed(() => {
    const current = new Date()
    const serviceYearStart = current.getMonth() < 8 ? new Date(current.getFullYear() - 1, 8, 1) : new Date(current.getFullYear(), 8, 1)
    // Mock example: only has data for current month
    // Replace with actual data structure when storing historical data
    return dailyHours.value.reduce((sum, h) => sum + h, 0)
  })

  function editDay(index: number | null) {
    if (index === null) return
    const input = prompt(`Enter hours for Day ${index + 1}:`, dailyHours.value[index].toString())
    if (input !== null) {
      const parsed = parseFloat(input)
      if (!isNaN(parsed) && parsed >= 0) {
        dailyHours.value[index] = parsed
      }
    }
  }

  const weeks = computed(() => {
    const result: number[][] = []
    let week: (number | null)[] = new Array(firstDayOfWeek).fill(null)
    for (let i = 0; i < dailyHours.value.length; i++) {
      if (week.length === 7) {
        result.push(week)
        week = []
      }
      week.push(i)
    }
    while (week.length < 7) week.push(null)
    result.push(week)
    return result
  })

  function getWeekdayName(index: number): string {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]
  }
</script>

<style scoped>
  .hours-page {
    background-color: #5e5e5e;
    min-height: 100vh;
    padding: 2rem;
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .icon {
    font-size: 2rem;
    margin-right: 0.75rem;
    color: #2e7d32;
  }

  h1 {
    font-size: 2rem;
    color: #2e7d32;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .card {
    position: relative;
    background: #ffffff;
    padding: 1rem;
    border-radius: 16px;
    margin-bottom: 1.25rem;
    width: 100%;
    max-width: 900px;
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.05),
      0 4px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    z-index: 0;
  }

  .card.goal {
    padding-top: 1rem;
    padding-bottom: 2rem;
    overflow-y: auto;
  }

  .card::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    padding: 2px;
    border-radius: 16px;
    background: linear-gradient(135deg, #2e7d32, #81c784);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .card input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #888;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    background-color: #fefefe;
  }

  .card input:focus {
    outline: none;
    border-color: #2e7d32;
    box-shadow: 0 0 6px rgba(46, 125, 50, 0.2);
  }

  .summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.25rem;
    margin-top: 1rem;
    font-size: 1.05rem;
    font-weight: bold;
    color: #444;
    text-align: left;
  }

  .summary-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .summary-item div:first-child {
    font-size: 0.9rem;
    color: #666;
  }

  .entry h2 {
    margin-bottom: 1rem;
    color: #2e7d32;
    font-weight: 600;
  }

  .weekday-header {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #444;
    font-size: 0.85rem;
    width: 100%;
    max-width: 900px;
  }

  .weekday {
    flex: 1;
    text-align: center;
  }

  .calendar-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    font-size: 0.85rem;
  }

  .week-row {
    display: flex;
    justify-content: space-between;
    gap: 0.4rem;
  }

  .divider {
    border: none;
    border-top: 1px solid #ccc;
    margin: 1.5rem 0;
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
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    border: 2px solid transparent;
    min-width: 0;
  }

  .day-input:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #81c784;
  }

  .day-input label {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
    color: #2e7d32;
  }

  .day-input input {
    border: none;
    background: #99b6a6;
    border-radius: 6px;
    text-align: center;
    font-size: 0.95rem;
    font-weight: bold;
    color: rgb(36, 36, 36);
    width: 40px;
    padding: 0.15rem 0;
    pointer-events: none;
  }

  .card select {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0 1rem;
    border: 1px solid #888;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #fefefe;
  }


  .back-button {
    align-self: flex-start;
    margin-bottom: 1rem;
    background: none;
    border: none;
    color: #ffffff;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: background 0.2s ease;
  }

  .back-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .calendar-header {
    text-align: center;
    margin-bottom: 1rem;
    color: #fff;
  }

  .day-input.empty {
    background: transparent;
    box-shadow: none;
    cursor: default;
    border: none;
  }


  .surplus-label {
    font-size: 0.75rem;
    color: #2e7d32;
    font-weight: 500;
    margin-left: 0.5rem;
  }
</style>
