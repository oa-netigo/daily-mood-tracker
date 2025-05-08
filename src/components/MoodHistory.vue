<template>
  <div class="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
      Your mood history:
    </h2>
    <div v-if="entries.length > 0" class="flex flex-col gap-4">
      <MoodEntry
        v-for="(entry, index) in entries"
        :key="index"
        :entry="entry"
        :index="index"
        @delete-entry="handleDeleteEntry"
        @edit-entry="handleEditEntry"
        ref="moodEntries"
      />
    </div>
    <div v-else class="no-entries">
      <p>No mood entries yet. Start tracking your mood!</p>
    </div>
  </div>
</template>

<script>
import { useMoodStore } from '../composables/useMoodStore'
import MoodEntry from './MoodEntry.vue'

export default {
  name: 'MoodHistory',
  components: {
    MoodEntry
  },
  props: {
    entries: {
      type: Array,
      required: true
    }
  },
  setup(_, { emit }) {
    const { deleteMoodEntry, editMoodEntry } = useMoodStore()

    const handleDeleteEntry = (index) => {
      deleteMoodEntry(index)
      emit('delete-entry', index)
    }

    const handleEditEntry = (payload) => {
      editMoodEntry(payload.index, {
        mood: payload.mood,
        note: payload.note
      })
      emit('edit-entry', payload)
    }

    return {
      handleDeleteEntry,
      handleEditEntry
    }
  }
}
</script>
