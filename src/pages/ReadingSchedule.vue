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
    padding: 16px;
    background: linear-gradient(135deg, #eef2f3, #c9d6ff);
    min-height: 100vh;
    box-sizing: border-box;
  }

  .close-button {
    position: absolute;
    top: 12px;
    right: 16px;
    background: none;
    border: none;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
  }

  .reading-layout {
    display: block;
    margin-top: 24px;
  }

  .reading-card {
    flex: 2;
    background: white;
    padding: 20px;
    border-radius: 16px;
    border: 2px solid transparent;
    background-clip: padding-box;
    /* Gradient border and colorful shadow */
    box-shadow:
      0 2px 8px 0 rgba(106, 17, 203, 0.15),
      0 10px 25px rgba(37, 117, 252, 0.12),
      0 0 0 4px rgba(106, 17, 203, 0.07);
    position: relative;
    /* Gradient border using pseudo-element */
    z-index: 0;
  }

  .reading-card::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(90deg, #6a11cb, #2575fc, #43e97b 99%);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .reading-card h2 {
    margin-bottom: 12px;
    font-size: 20px;
    color: #2e5aac;
  }

  .reading-label {
    margin-top: 8px;
    font-weight: bold;
    color: #555;
    font-size: 14px;
  }

  .reading-text {
    font-size: 16px;
    color: #1a1a1a;
    margin-bottom: 12px;
  }

  .reading-card button {
    padding: 10px 20px;
    margin-top: 16px;
    border: none;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: white;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s;
    box-shadow: 0 2px 6px rgba(106, 17, 203, 0.10);
  }

  .reading-card button:hover:enabled {
    background: linear-gradient(to right, #5a00b1, #1a5aff);
    transform: translateY(-2px) scale(1.03);
  }

  .reading-card button:disabled {
    background-color: #bbb;
    cursor: default;
    opacity: 0.7;
  }

  .streak {
    margin-top: 18px;
    font-weight: bold;
    color: #28a745;
    font-size: 1.1em;
    letter-spacing: 0.01em;
    text-shadow: 0 1px 4px #c9f7da;
  }

  .quote {
    margin-top: 20px;
    background: #f0f9ff;
    border-left: 4px solid #6a11cb;
    padding: 12px;
    border-radius: 6px;
    font-style: italic;
    font-size: 14px;
    color: #333;
    box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.05);
  }

  .sidebar {
    margin-top: 24px;
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .section {
    margin-bottom: 20px;
  }

  .section h3 {
    margin-bottom: 8px;
    color: #2575fc;
  }

  .section ul {
    list-style: disc;
    padding-left: 20px;
    font-size: 14px;
    color: #333;
  }

  blockquote {
    font-style: italic;
    color: #444;
    border-left: 4px solid #2575fc;
    padding-left: 12px;
    margin: 8px 0;
    font-size: 14px;
  }

  p,
  li {
    color: #333;
  }

  @media (max-width: 600px) {
    .reading-layout {
      display: block;
      margin-top: 16px;
    }

    .reading-card {
      padding: 16px;
    }

    .reading-card h2 {
      font-size: 18px;
    }

    .reading-text {
      font-size: 15px;
    }

    .reading-card button {
      width: 100%;
    }

    .quote {
      font-size: 13px;
    }

    .sidebar {
      padding: 14px;
      margin-top: 18px;
    }

    .section h3 {
      font-size: 16px;
    }

    .section ul,
    .section p,
    blockquote {
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
