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
  import { defineComponent, h, ref, onMounted } from 'vue';

  /* Icons */
  import Note from 'vue-material-design-icons/Note.vue';
  import Book from 'vue-material-design-icons/BookMultiple.vue';
  import Research from 'vue-material-design-icons/Magnify.vue';

  import bibleImg from '@/assets/bible.png';
  import notesImg from '@/assets/notes.png';
  import researchImg from '@/assets/research.png';

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
    props: { variant: String },
    setup(props) {
      const imageSources = {
        Bible: bibleImg,
        Notes: notesImg,
        Research: researchImg
      };

      const bannerSrc = ref('');

      const loadBannerImage = (url: string) => {
        const storedImage = localStorage.getItem(url);
        if (storedImage) {
          bannerSrc.value = storedImage;
        } else {
          fetch(url)
            .then(res => res.blob())
            .then(blob => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64 = reader.result as string;
                localStorage.setItem(url, base64);
                bannerSrc.value = base64;
              };
              reader.readAsDataURL(blob);
            })
            .catch(console.error);
        }
      };

      onMounted(() => {
        const url = imageSources[props.variant as keyof typeof imageSources];
        loadBannerImage(url);
      });

      return () => bannerSrc.value ? h('img', { src: bannerSrc.value }) : null;
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

  .imgBanner img {
    display: block;
    width: 100%;
    height: 190px;
    object-fit: cover;
    margin-top: 12px;
    border-radius: 10px;
    opacity: 0.9;
  }

</style>
