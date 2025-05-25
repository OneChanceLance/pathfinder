<template>
    <div class="cardContainer" @click.self="$emit('open', title)">
        <VCard color="secondary" variant="outlined" elevation="4" class="clickable-card">
            <div class="card-header">
                <VCardTitle>{{ title }}</VCardTitle>
                <button class="delete-btn" @click.stop="confirmDelete">✕</button>
            </div>
            <VCardText class="instruction">Tap to explore this topic</VCardText>
        </VCard>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        title: string
    }>()
    const title = props.title

    const emit = defineEmits(['open', 'request-delete'])

    function confirmDelete() {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            emit('request-delete', title)
        }
    }
</script>

<style scoped>
    .cardContainer {
        width: 100%;
        margin: 0.5rem 0;
        cursor: pointer;
    }

    .clickable-card {
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        border-left: 4px solid #054f4fff;
        /* accent stripe */
        padding: 0.5rem;
    }

    .clickable-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .instruction {
        color: #888;
        font-size: 0.85rem;
        margin-top: 4px;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .delete-btn {
        background: transparent;
        border: none;
        color: #d32f2f;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        padding-right: 1rem;
    }
</style>