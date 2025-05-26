<template>
  <button class="back-button">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
    <span>Back</span>
  </button>
</template>

<style scoped>
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
</style>
