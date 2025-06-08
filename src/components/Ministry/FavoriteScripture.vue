<template>
  <button class="menu-card" @click="goToScripture" @mousedown.right.prevent="resetScripture">
    <div class="title-row">
      <Icon class="icon" />
      <span class="title">{{ displayTitle }}</span>
      <span class="arrow">›</span>
    </div>
  </button>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Icon from 'vue-material-design-icons/StarOutline.vue';

  const props = defineProps({
    title: String,
    number: Number
  });

  const displayTitle = ref('Favorite Scripture');
  const scriptureLink = ref('');

  onMounted(() => {
    const storedScripture = localStorage.getItem(`favoriteScripture${props.number}`);
    const storedLink = localStorage.getItem(`favoriteScriptureLink${props.number}`);
    if (storedScripture) displayTitle.value = storedScripture;
    if (storedLink) scriptureLink.value = storedLink;
  });

  function goToScripture() {
    if (!scriptureLink.value) {
      const input = prompt('Enter scripture title (e.g., John 3:16)');
      const link = prompt('Enter scripture link (e.g., https://www.jw.org/finder?wtlocale=E&docid=1001061146)');
      if (input && link) {
        displayTitle.value = input;
        scriptureLink.value = link;
        localStorage.setItem(`favoriteScripture${props.number}`, input);
        localStorage.setItem(`favoriteScriptureLink${props.number}`, link);
        window.open(link, '_blank');
      }
    } else {
      window.open(scriptureLink.value, '_blank');
    }
  }

  function resetScripture() {
    localStorage.removeItem(`favoriteScripture${props.number}`);
    localStorage.removeItem(`favoriteScriptureLink${props.number}`);
    displayTitle.value = 'Favorite Scripture';
    scriptureLink.value = '';
  }
</script>

<style scoped>
  .menu-card {
    width: 100%;
    align-items: stretch;
    padding: 16px;
    background: linear-gradient(135deg, rgba(208, 255, 244, 0.504) 0%, #bef0fa82 100%);
    border: 1px solid rgb(255 255 255 / 31%);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    cursor: pointer;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .menu-card .icon {
    width: 24px;
    height: 24px;
    color: #054f4fff;
    flex-shrink: 0;
  }

  .menu-card .title {
    flex: 1;
    font-size: 16px;
    color: #0a2533;
    text-align: left;
  }

  .menu-card .arrow {
    font-size: 18px;
    color: #0a2533;
    flex-shrink: 0;
  }
</style>
