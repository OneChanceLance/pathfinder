<template>
  <div class="page-container">
    <div class="card">
      <!-- Header -->
      <div class="card-header">
        <button class="back-button" @click="$emit('close')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span>Back</span>
        </button>

      </div>

      <!-- Title -->
      <div class="card-title">
        <div class="title-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <h1>Monthly Report</h1>
      </div>

      <!-- Settings -->
      <div class="options">
        <div class="option">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
            <circle cx="12" cy="7" r="4" />
            <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
          </svg>
          <select v-model="selectedRole" class="glass-field">
            <option value="Publisher (No Requirement)">Publisher (No Requirement)</option>
            <option value="Auxiliary Pioneer">Auxiliary Pioneer</option>
            <option value="Regular Pioneer">Regular Pioneer</option>
          </select>
        </div>
        <div class="option">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <label class="nowrap-label">Monthly Goal (hours)</label>
          <input type="number" v-model.number="monthlyGoal" class="glass-field flex-input" />
        </div>
      </div>

      <!-- Stats -->
      <div class="stats">
        <div class="stat-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
            <circle cx="12" cy="7" r="4" />
            <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
          </svg>
          <div class="label">Total Hours<br />So Far</div>
          <div class="value">{{ totalHours }}</div>
        </div>
        <div class="stat-card stat-remaining">
          <svg viewBox="0 0 36 36" class="ring-icon">
            <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" stroke-width="4" stroke-opacity="0.2" />
            <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" stroke-width="4"
              :stroke-dasharray="`${(remainingHours / monthlyGoal) * 100} 100`" transform="rotate(-90 18 18)" />
          </svg>
          <div class="label">Remaining</div>
          <div class="value">{{ remainingHours }}</div>
        </div>
        <div class="stat-card">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <div class="label">YTD<br />(Service Year)</div>
          <div class="value">{{ ytdHours }}</div>
        </div>
      </div>

      <!-- Calendar -->
      <v-sheet class="pa-4 rounded-xl calendar-bg">
        <v-row align="center" justify="space-between" class="mb-2">
          <v-btn icon @click="prevMonth"><v-icon>mdi-chevron-left</v-icon></v-btn>
          <div class="text-subtitle-1 font-weight-medium">
            {{ currentYear }} - {{ String(currentMonth + 1).padStart(2, '0') }}
          </div>
          <v-btn icon @click="nextMonth"><v-icon>mdi-chevron-right</v-icon></v-btn>
        </v-row>
        <v-row dense>
          <v-col v-for="(day, idx) in days" :key="idx" class="text-center text-caption">
            {{ day }}
          </v-col>
        </v-row>
        <v-row dense v-for="(week, wIdx) in calendar" :key="wIdx">
          <v-col v-for="(date, dIdx) in week" :key="dIdx" class="text-center">
            <div class="day-cell"
              :class="{ 'filled-day': date && dailyHours[`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`] > 0 }"
              @click="onDayClick(date)">
              <span>{{ date }}</span>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const roles = ['Publisher (No Requirement)', 'Auxiliary Pioneer', 'Regular Pioneer']
  const selectedRole = ref(roles[0])
  const monthlyGoal = ref(0)

  // track hours per day keyed by "YYYY-MM-DD"
  const dailyHours = ref<Record<string, number>>({})

  const today = new Date()
  const currentMonth = ref(today.getMonth())
  const currentYear = ref(today.getFullYear())

  // generate weeks of the calendar
  const calendar = computed(() => {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
    const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
    const weeks: (number | null)[][] = []
    let week: (number | null)[] = Array(firstDay).fill(null)
    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d)
      if (week.length === 7) {
        weeks.push(week)
        week = []
      }
    }
    if (week.length) {
      while (week.length < 7) week.push(null)
      weeks.push(week)
    }
    return weeks
  })

  // sum of this month
  const totalHours = computed(() => {
    return Object.entries(dailyHours.value)
      .filter(([date]) => {
        const [y, m] = date.split('-').map(Number)
        return y === currentYear.value && m === currentMonth.value + 1
      })
      .reduce((sum, [, hrs]) => sum + hrs, 0)
  })

  // remaining for this month
  const remainingHours = computed(() => monthlyGoal.value - totalHours.value)

  // year-to-date total (all entries)
  const ytdHours = computed(() =>
    Object.values(dailyHours.value).reduce((sum, hrs) => sum + hrs, 0)
  )

  function prevMonth() {
    if (currentMonth.value > 0) currentMonth.value--
    else {
      currentMonth.value = 11
      currentYear.value--
    }
  }

  function nextMonth() {
    if (currentMonth.value < 11) currentMonth.value++
    else {
      currentMonth.value = 0
      currentYear.value++
    }
  }

  function onDayClick(day: number | null) {
    if (!day) return
    const key = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const input = prompt(`Enter hours for ${key}`, String(dailyHours.value[key] ?? '0'))
    const h = parseFloat(input || '0')
    dailyHours.value[key] = isNaN(h) ? 0 : h
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
</script>

<style scoped>
  .page-container {
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #b2feec 0%, #0ed2f7 100%);
  }

  .card {
    padding: 24px;
    height: auto;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
    color: #0a2533;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .back-button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: inherit;
    font-size: 16px;
    cursor: pointer;
  }

  .back-button svg {
    width: 24px;
    height: 24px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .card-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .title-icon {
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title-icon svg {
    width: 20px;
    height: 20px;
  }

  .options {
    background: rgba(255, 255, 255, 0.4);
    border: 2px solid rgb(255 255 255 / 31%);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: nowrap;
    white-space: nowrap;
  }

  .option svg {
    width: 24px;
    height: 24px;
  }

  .option svg {
    flex-shrink: 0;
  }

  .nowrap-label {
    white-space: nowrap;
  }

  .option select,
  .option input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: inherit;
  }

  .glass-field {
    background: rgba(255, 255, 255, 0.4);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 8px;
    position: relative;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.4);
    border: 2px solid rgb(255 255 255 / 31%);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
  }

  .stat-card svg {
    width: 24px;
    height: 24px;
  }

  .stat-card .label {
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
  }

  .stat-card .value {
    font-size: 24px;
    font-weight: bold;
  }

  .stat-remaining .ring-icon {
    width: 36px;
    height: 36px;
    color: #219fb8;
  }

  .calendar {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 12px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .week-day {
    text-align: center;
    font-weight: 500;
    font-size: 12px;
  }

  .day-cell {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .filled-day {
    background-color: rgba(162, 217, 201, 0.6);
    border-radius: 50%;
  }



  .flex-input {
    margin-left: auto;
    flex-shrink: 0;
  }


</style>
