<template>
  <button class="menu-card">
    <div class="title-row">
      <Icon :variant="title" class="icon" />
      <span class="title">{{ title }}</span>
      <span class="arrow">›</span>
    </div>
    <div class="details-row" :class="format === 'grid' ? 'grid-layout' : 'column-layout'">
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
  import { defineComponent, h } from 'vue';
  import ClockOutline from 'vue-material-design-icons/ClockOutline.vue';
  import MapOutline from 'vue-material-design-icons/MapOutline.vue'
  import FlashOutline from 'vue-material-design-icons/FlashOutline.vue';

  defineProps({
    title: String,
    format: String,
  })

  const Icon = defineComponent({
    props: {
      variant: String,
    },
    setup(props) {
      return () => {
        if (props.variant === "Hours") {
          return h(ClockOutline);
        } else if (props.variant === "Calls") {
          return h(MapOutline);
        } else if (props.variant === "Scriptures") {
          return h(FlashOutline);
        }
        return null;
      };
    },
  });
</script>

<style scoped>
  .menu-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 16px;
    background: linear-gradient(135deg, rgba(192, 253, 239, 0.561) 0%, #8cecff6a 100%);
    border: 1px solid rgba(255, 255, 255, 0.181);
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
    opacity: 0.9;
    gap: 2rem;
  }


  .details-row {
    text-align: left;
    height: auto;
    margin-top: 12px;
    border-radius: 10px;
    opacity: 0.9;

  }

  .details-row.column-layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .details-row.grid-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .details-row span {
    width: auto;
    font-size: 15px;
  }

</style>
