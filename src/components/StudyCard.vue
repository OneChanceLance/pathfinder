<template>
  <button class="card-button">
    <div class="titleContainer">
      <Icon :variant="variant" class="icon" />
      <span class="text">{{ title }}</span> <span class="arrow">›</span>
    </div>
    <div class="imgBanner">
      <Banner :variant="variant" class="banner" />
    </div>
  </button>
</template>

<script setup lang="ts">
  import { defineComponent, h } from 'vue';

  /* Icons */
  import Note from 'vue-material-design-icons/Note.vue';
  import Book from 'vue-material-design-icons/BookMultiple.vue';
  import Research from 'vue-material-design-icons/Magnify.vue';

  defineProps({
    title: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      required: true
    },
  })

  const Icon = defineComponent({
    props: {
      variant: String,
    },
    setup(props) {
      return () => {
        if (props.variant === "Bible") {
          return h(Book);
        } else if (props.variant === "Notes") {
          return h(Note);
        } else if (props.variant === "Research") {
          return h(Research);
        }
        return null;
      };
    },
  });

  const Banner = defineComponent({
    props: {
      variant: String,
    },
    setup(props) {
      return () => {
        if (props.variant === "Bible") {
          return h('img', { src: '/src/assets/bible.png' });
        } else if (props.variant === "Notes") {
          return h('img', { src: '/src/assets/notes.png' });
        } else if (props.variant === "Research") {
          return h('img', { src: '/src/assets/research.png' });
        }
      };
    },
  });



</script>

<style scoped>
  .card-button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 16px;
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    cursor: pointer;
    transition: background 0.2s;
  }

  .card-button:hover {
    background: rgba(255, 255, 255, 0.35);
  }

  .titleContainer {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-button .icon {
    width: 24px;
    height: 24px;
    color: #054f4fff;
    flex-shrink: 0;
  }

  .card-button .text {
    flex: 1;
    font-size: 16px;
    color: #0a2533;
    text-align: left;
  }

  .card-button .arrow {
    font-size: 18px;
    color: #0a2533;
    flex-shrink: 0;
  }

  .imgBanner {
    margin-top: 12px;
    width: 100%;
  }

  .imgBanner img {
    display: block;
    width: 100%;
    height: 190px;
    object-fit: cover;
    border-radius: 12px;

  }
</style>
