<template>
  <div>
    <div class="stat-card">
      <AccountOutline class="icon" />
      <div class="label">{{ firstName }} {{ lastName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import AccountOutline from 'vue-material-design-icons/Account.vue'
  defineProps({
    firstName: String,
    lastName: String
  })
</script>

<style scoped>
  .stat-card {
    background: linear-gradient(135deg, rgba(208, 255, 244, 0.504) 0%, #bef0fa82 100%);
    border: 1px solid rgb(255 255 255 / 31%);
    border-radius: 12px;
    width: 100%;
    padding: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    position: relative;
  }

  .stat-card .icon {

    width: 24px;
    height: 24px;
  }

  .stat-card .label {
    display: flex;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    line-height: 1;
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
