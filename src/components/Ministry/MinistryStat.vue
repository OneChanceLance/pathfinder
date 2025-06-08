<template>
  <div class="stat-card">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
    <div class="label">{{ title }}</div>
    <div class="value">
      <template v-if="variant === 'month'">{{ totalHours }}</template>
      <template v-else-if="variant === 'year'">{{ ytdHours }}</template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  defineProps({
    title: String,
    variant: String,
  })
  const dailyHours = ref<Record<string, number>>(JSON.parse(localStorage.getItem('dailyHours') || '{}'))

  const today = new Date()
  const currentMonth = ref(today.getMonth())
  const currentYear = ref(today.getFullYear())


  const totalHours = computed(() => {
    return Object.entries(dailyHours.value)
      .filter(([date]) => {
        const [y, m] = date.split('-').map(Number)
        return y === currentYear.value && m === currentMonth.value + 1
      })
      .reduce((sum, [, hrs]) => sum + hrs, 0)
  })

  // year-to-date total (all entries)
  const ytdHours = computed(() =>
    Object.values(dailyHours.value).reduce((sum, hrs) => sum + hrs, 0)
  )
</script>

<style scoped>

  .stat-card {
    background: linear-gradient(135deg, rgba(208, 255, 244, 0.504) 0%, #bef0fa82 100%);
    border: 1px solid rgb(255 255 255 / 31%);
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
    display: flex;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
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


</style>
