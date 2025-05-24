<template>
  <div class="reading-schedule">
    <button class="close-button" @click="$emit('close')">✕</button>
    <h1>Today's Bible Reading</h1>
    <div class="reading-layout">
      <div class="reading-card">
        <h2>{{ today.date }}</h2>
        <p class="reading-label">Reading:</p>
        <p class="reading-text">{{ today.reading }}</p>
        <button @click="toggleCompleted">
          {{ today.checked ? 'Completed' : 'Mark as Completed' }}
        </button>
        <p class="streak">🔥 Streak: {{ streak }} day{{ streak === 1 ? '' : 's' }}</p>
        <div class="quote">
          <strong>“</strong> The one reading aloud is happy. — Revelation 1:3
        </div>
      </div>
      <div class="sidebar">
        <div class="section">
          <h3>Related Scriptures</h3>
          <ul>
            <li><strong>Genesis 1:1</strong> — “In the beginning God created the heavens and the earth.”</li>
            <li><strong>Psalm 19:1</strong> — “The heavens are declaring the glory of God.”</li>
            <li><strong>Hebrews 11:3</strong> — “By faith we understand that the systems of things were put in order at
              God's command.”</li>
          </ul>
        </div>
        <div class="section">
          <h3>Spiritual Focus Thought</h3>
          <p>Jehovah is a God of order. As you read today, reflect on how his creation shows wisdom, structure, and
            purpose.</p>
        </div>
        <div class="section">
          <h3>Did You Know?</h3>
          <p>The Hebrew word for “create” used in Genesis 1:1 (baraʼ) is used exclusively with God as the subject,
            highlighting his unique creative power.</p>
        </div>
        <div class="section">
          <h3>Encouraging Verse</h3>
          <blockquote>“Your word is a lamp to my foot, and a light for my path.” — Psalm 119:105</blockquote>
        </div>
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
  .reading-schedule {
    position: relative;
    padding: 20px;
    min-height: 100vh;
    background: linear-gradient(135deg, #f6f9ff, #e0e7ff);
    font-family: 'Segoe UI', sans-serif;
    color: #1a1a1a;
  }

  .close-button {
    position: absolute;
    top: 16px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
    color: #5e5e5e;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .close-button:hover {
    transform: rotate(90deg);
    color: #ff5f6d;
  }

  h1 {
    font-size: 28px;
    color: #3742fa;
    text-align: center;
    margin-top: 30px;
  }

  .reading-layout {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 32px;
  }

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
    color: #1e90ff;
    margin-bottom: 8px;
  }

  .reading-label {
    font-weight: 600;
    color: #6c63ff;
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
