<template>
  <div class="study-dashboard">
    <h1>Study Dashboard</h1>
    <div class="menu">
      <button class="card-button" @click="goTo('calls')">

        <div class="titleContainer">
          <Book class="icon" />
          <span class="text">Bible Reading Schedule</span> <span class="arrow">›</span>
        </div>
        <div class="imgBanner">
          <img src="./../assets/bible.png" class="banner">
        </div>
      </button>
      <button class="card-button" @click="goTo('Notes')">

        <div class="titleContainer">
          <AccountGroupIcon class="icon" />
          <span class="text">Research</span> <span class="arrow">›</span>
        </div>
        <div class="imgBanner">
          <img src="./../assets/research.png" class="banner">
        </div>
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
  import Book from 'vue-material-design-icons/BookMultiple.vue';
  import FlashIcon from 'vue-material-design-icons/Flash.vue';
  import MapIcon from 'vue-material-design-icons/Map.vue';
  import AccountGroupIcon from 'vue-material-design-icons/Magnify.vue';
</script>

<style scoped>
  .study-dashboard {
    top: 0;
    left: 0;
    height: 100dvh;
    width: 100%;
    background: white;
    overflow-y: auto;
    padding: 20px;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }


  .card-button {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #1a1a1a;
    cursor: pointer;
    transition: background-color 0.2s ease;

    display: flex;
    flex-direction: column;

    flex: 1;
    overflow: hidden;
  }

  .card-button:hover {
    background-color: #f0f0f0;
  }

  .card-button .icon {
    font-size: 20px;
    color: #054f4fff;
  }

  .card-button .arrow {
    font-size: 18px;
    color: #999;
  }

  .card-button .text {
    flex: 1;
    text-align: left;
  }

  .titleContainer {
    display: flex;
    font-size: 16px;
    padding: 14px 16px;
    font-weight: 500;
    color: #1a1a1a;
    cursor: pointer;
    transition: background-color 0.2s ease;
    width: 100%;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
  }

  .titleContainer span {
    display: flex;
    align-items: center;

  }

  button {
    padding: 0;
  }

  .imgBanner {
    width: 100%;

  }

  .imgBanner img {
    display: block;
    width: 100%;
    height: 190px;
    object-fit: cover;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
</style>
