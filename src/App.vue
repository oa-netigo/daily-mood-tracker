<template>
  <AppHeader />
  <section class="bg-white pb-16 antialiased dark:bg-gray-900">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
        <MoodForm @save-mood="saveMood" />
        <MoodHistory :entries="moodEntries" @delete-entry="handleDeleteEntry" @edit-entry="handleEditEntry" />
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'
import { useMoodStore } from './composables/useMoodStore'
import AppHeader from './components/AppHeader.vue'
import MoodForm from './components/MoodForm.vue'
import MoodHistory from './components/MoodHistory.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    MoodForm,
    MoodHistory
  },
  setup() {
    const { moodEntries, addMoodEntry, deleteMoodEntry, editMoodEntry } = useMoodStore()

    const saveMood = (moodData) => {
      addMoodEntry(moodData)
      saveToLocalStorage()
    }

    const handleDeleteEntry = (index) => {
      deleteMoodEntry(index)
      saveToLocalStorage()
    }

    const handleEditEntry = ({ index, mood, note }) => {
      editMoodEntry(index, { mood, note })
      saveToLocalStorage()
    }

    const saveToLocalStorage = () => {
      localStorage.setItem('moodEntries', JSON.stringify(moodEntries.value))
    }

    const loadFromLocalStorage = () => {
      const savedEntries = localStorage.getItem('moodEntries')
      if (savedEntries) {
        moodEntries.value = JSON.parse(savedEntries)
      }
    }

    onMounted(() => {
      loadFromLocalStorage()
    })

    return {
      moodEntries,
      saveMood,
      handleDeleteEntry,
      handleEditEntry
    }
  }
}
</script>
