<template>
    <div class="notes-page">
        <h1>Notes</h1>
        <div class="new-note">
            <textarea v-model="newNote" placeholder="Write your note here..." />
            <button @click="addNote">Add Note</button>
        </div>
        <ul class="note-list">
            <li v-for="(note, index) in notes" :key="index">
                <p>{{ note }}</p>
                <button @click="deleteNote(index)">Delete</button>
            </li>
        </ul>
        <button class="close-button" @click="$emit('close')">✕</button>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    const notes = ref<string[]>([]);
    const newNote = ref('');

    function loadNotes() {
        const stored = localStorage.getItem('notes');
        if (stored) notes.value = JSON.parse(stored);
    }

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes.value));
    }

    function addNote() {
        if (!newNote.value.trim()) return;
        notes.value.push(newNote.value.trim());
        newNote.value = '';
        saveNotes();
    }

    function deleteNote(index: number) {
        notes.value.splice(index, 1);
        saveNotes();
    }

    onMounted(loadNotes);
    defineEmits(['close']);
</script>

<style scoped>
    .notes-page {
        padding: 20px;
        position: relative;
    }

    .new-note {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
    }

    .new-note textarea {
        padding: 10px;
        font-size: 14px;
        border-radius: 6px;
        border: 1px solid #ccc;
        resize: vertical;
        min-height: 80px;
    }

    .new-note button {
        align-self: flex-end;
        padding: 8px 12px;
        border-radius: 6px;
        background-color: #2e5aac;
        color: white;
        border: none;
        cursor: pointer;
    }

    .note-list {
        list-style: none;
        padding: 0;
    }

    .note-list li {
        background: #f4f4f4;
        padding: 10px;
        border-radius: 6px;
        margin-bottom: 10px;
        position: relative;
    }

    .note-list button {
        position: absolute;
        top: 8px;
        right: 8px;
        background: #dc3545;
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    }

    .close-button {
        position: absolute;
        top: 12px;
        right: 16px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
    }
</style>