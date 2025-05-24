<template>
  <main class="page scripture-page">
    <div class="header">
      <h1>Scripture Topics</h1>
      <button class="close-button" v-if="!activeSubject" @click="handleClose">×</button>
    </div>

    <div v-if="!activeSubject" class="subject-list">
      <div v-for="subject in subjects" :key="subject.id" class="subject-card" @click="selectSubject(subject)">
        <h2>{{ subject.title }}</h2>
        <p>{{ subject.verses.length }} scriptures</p>
      </div>
    </div>

    <div v-else class="scripture-view">
      <h2>{{ activeSubject.title }}</h2>
      <div class="verses">
        <div v-for="verse in activeSubject.verses" :key="verse.ref" class="verse-card">
          <p class="verse-ref">{{ verse.ref }}</p>
          <p class="verse-text" v-html="formatVerse(verse.text)"></p>
        </div>
      </div>
      <button class="back-button" @click="activeSubject = null">Back</button>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const emit = defineEmits(['close'])

  interface Subject {
    id: number
    title: string
    verses: { ref: string, text: string }[]
  }

  const subjects = ref<Subject[]>([
    {
      id: 1,
      title: 'Hope for the Dead',
      verses: [
        {
          ref: 'John 5:28, 29',
          text: 'Do not be amazed at this, for the hour is coming in which **all those in the memorial tombs will hear his voice and come out**, those who did good things to a resurrection of life, and those who practiced vile things to a resurrection of judgment.'
        },
        {
          ref: 'Acts 24:15',
          text: 'And I have hope toward God, which hope these men also look forward to, that **there is going to be a resurrection of both the righteous and the unrighteous**.'
        },
        {
          ref: 'Revelation 21:3, 4',
          text: 'With that I heard a loud voice from the throne say: “Look! The tent of God is with mankind... **And he will wipe out every tear from their eyes, and death will be no more, neither will mourning nor outcry nor pain be anymore.** The former things have passed away.”'
        }
      ]
    },
    {
      id: 2,
      title: 'Fear of Man',
      verses: [
        {
          ref: 'Proverbs 29:25',
          text: '**Trembling at men is a snare, but the one trusting in Jehovah will be protected.**'
        },
        {
          ref: 'Isaiah 51:12, 13',
          text: '“I—I myself am the One comforting you. **Why should you be afraid of a mortal man who will die...** and have forgotten Jehovah your Maker?”'
        }
      ]
    },
    {
      id: 3,
      title: 'Jehovah’s Name',
      verses: [
        {
          ref: 'Psalm 83:18',
          text: '**May people know that you, whose name is Jehovah, You alone are the Most High over all the earth.**'
        },
        {
          ref: 'Romans 10:13',
          text: '**Everyone who calls on the name of Jehovah will be saved.**'
        }
      ]
    }
  ])

  const activeSubject = ref<Subject | null>(null)

  function selectSubject(subject: Subject) {
    activeSubject.value = subject
  }

  function handleClose() {
    if (activeSubject.value) {
      activeSubject.value = null
    } else {
      emit('close')
    }
  }

  function formatVerse(text: string) {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  }
</script>

<style scoped>
  .scripture-page {
    padding: 2rem;
    max-width: 800px;
    margin: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .subject-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .subject-card {
    background: linear-gradient(135deg, #cce7ff, #e8f0fe);
    padding: 1rem;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }

  .subject-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }

  .scripture-view {
    position: relative;
  }

  .close-button {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: #444;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .close-button:hover {
    color: #000;
  }

  .scripture-view h2 {
    margin-bottom: 1rem;
  }

  .verses {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .verse-card {
    background: #ffffff;
    border-left: 5px solid #2196f3;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .verse-ref {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  .verse-text {
    font-size: 1rem;
    color: #333;
  }

  .back-button {
    margin-top: 2rem;
    background-color: #054f4f;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    transition: background 0.3s;
  }

  .back-button:hover {
    background-color: #066868;
  }
</style>
