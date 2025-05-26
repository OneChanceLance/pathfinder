<template>
  <OverlayCard title="Reading Schedule">
    <StandardCard>
      <h2>{{ today.date }}</h2>
      <h3>{{ today.reading }}</h3>
      <button @click="toggleCompleted">
        {{ today.checked ? 'Completed' : 'Mark as Completed' }}
      </button>
    </StandardCard>


  </OverlayCard>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import OverlayCard from '@/components/OverlayCard.vue';
  import StandardCard from '@/components/ReadingSchedule/StandardCard.vue';


  interface ReadingDay {
    date: string;
    reading: string;
    checked: boolean;
  }

  // Returns a reading label like "Genesis 1", "Genesis 2", etc.
  function generateReadingPlan(days: number): string[] {
    const plan: string[] = [];
    const book = 'Genesis';
    const totalChapters = 50;

    let chapter = 1;

    for (let i = 0; i < days; i++) {
      if (chapter <= totalChapters) {
        plan.push(`${book} ${chapter}`);
        chapter++;
      } else {
        plan.push('---'); // or continue with Exodus, etc.
      }
    }

    return plan;
  }

  const today = ref<ReadingDay>({
    date: '',
    reading: '',
    checked: false,
  });
  const streak = ref(0);

  function toggleCompleted() {
    today.value.checked = !today.value.checked;
    localStorage.setItem('readingToday', JSON.stringify(today.value));

    const todayDate = new Date().toDateString();

    if (today.value.checked) {
      const lastStreakDate = localStorage.getItem('lastStreakDate');
      if (lastStreakDate !== todayDate) {
        if (lastStreakDate === new Date(Date.now() - 86400000).toDateString()) {
          streak.value++;
        } else {
          streak.value = 1;
        }
        localStorage.setItem('lastStreakDate', todayDate);
        localStorage.setItem('readingStreak', streak.value.toString());
      }
    } else {
      localStorage.removeItem('lastStreakDate');
      streak.value = 0;
      localStorage.setItem('readingStreak', '0');
    }
  }

  onMounted(() => {
    const sampleReadings = generateReadingPlan(365);
    const todayDate = new Date().toDateString();
    const index = 0;

    today.value = JSON.parse(localStorage.getItem('readingToday') || 'null') || {
      date: todayDate,
      reading: sampleReadings[index],
      checked: false,
    };

    if (today.value.date !== todayDate) {
      today.value = {
        date: todayDate,
        reading: sampleReadings[index],
        checked: false,
      };
    }

    localStorage.setItem('readingToday', JSON.stringify(today.value));

    const storedStreak = parseInt(localStorage.getItem('readingStreak') || '0');
    streak.value = storedStreak;
  });
</script>

<style scoped>

  .reading-card {
    background: #fff;
    padding: 24px;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(34, 34, 255, 0.05);
    position: relative;
    border: 2px solid transparent;
    background-clip: padding-box;
    z-index: 0;
  }

  .reading-card::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(135deg, #4facfe, #43e97b);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .reading-card h2 {

    margin-bottom: 8px;
  }

  .reading-label {


    margin-top: 12px;
    font-size: 15px;
  }

  .reading-text {
    font-size: 17px;
    margin-bottom: 14px;
  }

  .reading-card button {
    margin-top: 12px;
    background: linear-gradient(135deg, #6c63ff, #2980b9);
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .reading-card button:hover {
    background: linear-gradient(135deg, #5846ff, #2471a3);
    transform: translateY(-2px);
  }

  .streak {
    margin-top: 16px;
    color: #2ecc71;
    font-weight: bold;
    font-size: 1.1rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .quote {
    margin-top: 18px;
    background: #f0faff;
    border-left: 5px solid #3498db;
    padding: 12px 16px;
    font-style: italic;
    color: #333;
    border-radius: 8px;
  }

  .sidebar {
    background: #ffffff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  }

  .section {
    margin-bottom: 20px;
  }

  .section h3 {
    color: #6c5ce7;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .section ul,
  .section p {
    font-size: 14px;
    color: #2f3542;
  }

  blockquote {
    border-left: 4px solid #1e90ff;
    padding-left: 12px;
    font-style: italic;
    color: #555;
  }

  @media (max-width: 600px) {
    .reading-layout {
      flex-direction: column;
    }

    .reading-card,
    .sidebar {
      padding: 16px;
    }

    .reading-card h2 {
      font-size: 20px;
    }

    .reading-text {
      font-size: 15px;
    }

    .quote {
      font-size: 13px;
    }

    .streak {
      font-size: 1em;
    }

    .close-button {
      font-size: 22px;
      top: 10px;
      right: 12px;
    }
  }
</style>
